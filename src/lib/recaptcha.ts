export type RecaptchaAction = "contact_form" | "book_demo";

interface VerifyRecaptchaParams {
  token: string;
  expectedAction: RecaptchaAction;
  remoteIp?: string;
}

interface RecaptchaSiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  message?: string;
  errorCodes?: string[];
}

function getMinimumScore(): number {
  const configuredScore = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE || "");
  return Number.isFinite(configuredScore) ? configuredScore : 0.5;
}

export async function verifyRecaptcha({
  token,
  expectedAction,
  remoteIp,
}: VerifyRecaptchaParams): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return {
      success: false,
      message: "reCAPTCHA secret key is not configured.",
    };
  }

  if (!token) {
    return {
      success: false,
      message: "Missing reCAPTCHA token.",
    };
  }

  const formData = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    formData.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const result = (await response.json()) as RecaptchaSiteVerifyResponse;
    const minimumScore = getMinimumScore();

    if (!result.success) {
      return {
        success: false,
        message: "Google did not verify the reCAPTCHA token.",
        errorCodes: result["error-codes"],
      };
    }

    if (result.action !== expectedAction) {
      return {
        success: false,
        score: result.score,
        action: result.action,
        message: "reCAPTCHA action mismatch.",
      };
    }

    if (typeof result.score !== "number" || result.score < minimumScore) {
      return {
        success: false,
        score: result.score,
        action: result.action,
        message: "reCAPTCHA score is below the allowed threshold.",
      };
    }

    return {
      success: true,
      score: result.score,
      action: result.action,
    };
  } catch {
    return {
      success: false,
      message: "Failed to verify reCAPTCHA token.",
    };
  }
}
