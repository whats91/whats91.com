"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorState {
  marketing: number;
  utility: number;
  auth: number;
}

// Rate tiers mirror the volume tables shown above (utilityTiers/authTiers).
// Rates are identical between the two message types; only the volume
// boundaries at which each discount tier kicks in differ.
const rateSteps = [0.115, 0.1081, 0.1012, 0.0943, 0.0874, 0.0805];
const utilityBoundaries = [25_000_000, 50_000_000, 100_000_000, 200_000_000, 300_000_000];
const authBoundaries = [750_000, 15_000_000, 20_000_000, 50_000_000, 100_000_000];

function calculateTieredCost(volume: number, boundaries: number[]) {
  let remaining = volume;
  let totalCost = 0;

  for (let i = 0; i < boundaries.length && remaining > 0; i++) {
    const prevBoundary = i === 0 ? 0 : boundaries[i - 1];
    const tierVolume = Math.min(remaining, boundaries[i] - prevBoundary);
    totalCost += tierVolume * rateSteps[i];
    remaining -= tierVolume;
  }

  if (remaining > 0) {
    totalCost += remaining * rateSteps[5];
  }

  return totalCost;
}

function formatINR(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

/**
 * Real interactive tool — estimates monthly WhatsApp API cost against
 * Meta's tiered rates. Preserved exactly from the pre-migration page
 * (same formula, same defaults), only the presentation changed.
 */
export function PricingCostCalculator() {
  const [calculator, setCalculator] = useState<CalculatorState>({
    marketing: 100000,
    utility: 500000,
    auth: 100000,
  });

  const marketingCost = calculator.marketing * 0.8631;
  const utilityCost = calculateTieredCost(calculator.utility, utilityBoundaries);
  const authCost = calculateTieredCost(calculator.auth, authBoundaries);
  const totalCost = marketingCost + utilityCost + authCost;
  const markedUpCost = totalCost * 1.15;
  const savings = markedUpCost - totalCost;

  return (
    <div className="surface-card p-6 sm:p-8">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="calc-marketing" className="text-sm font-medium text-text-primary">
              Marketing Messages / Month
            </Label>
            <span className="text-caption">@ ₹0.8631 each</span>
          </div>
          <Input
            id="calc-marketing"
            type="number"
            value={calculator.marketing}
            onChange={(e) => setCalculator({ ...calculator, marketing: parseInt(e.target.value) || 0 })}
            className="h-11"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="calc-utility" className="text-sm font-medium text-text-primary">
              Utility Messages / Month
            </Label>
            <span className="text-caption">Volume tiers apply</span>
          </div>
          <Input
            id="calc-utility"
            type="number"
            value={calculator.utility}
            onChange={(e) => setCalculator({ ...calculator, utility: parseInt(e.target.value) || 0 })}
            className="h-11"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="calc-auth" className="text-sm font-medium text-text-primary">
              Authentication Messages / Month
            </Label>
            <span className="text-caption">Volume tiers apply</span>
          </div>
          <Input
            id="calc-auth"
            type="number"
            value={calculator.auth}
            onChange={(e) => setCalculator({ ...calculator, auth: parseInt(e.target.value) || 0 })}
            className="h-11"
          />
        </div>

        <div className="border-t border-border/60 pt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Marketing Cost:</span>
            <span className="font-medium text-text-primary">₹{formatINR(marketingCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Utility Cost (with tiers):</span>
            <span className="font-medium text-text-primary">₹{formatINR(utilityCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Authentication Cost:</span>
            <span className="font-medium text-text-primary">₹{formatINR(authCost)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-border/60 pt-4">
            <span className="text-text-primary">Total Monthly Cost:</span>
            <span className="text-brand-primary">₹{formatINR(totalCost)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-success-soft border border-success-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-text-primary">You save vs 15% markup:</p>
              <p className="text-caption">Based on Wati/AiSensy typical rates</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-bold text-success">₹{formatINR(savings)}</p>
              <p className="text-caption">per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
