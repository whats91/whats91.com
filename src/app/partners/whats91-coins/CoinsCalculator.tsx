"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Calculator, Coins, RotateCcw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PartnerKind = "partner" | "techPartner";
type CalculatorMode = "wallet" | "need";

type CoinItem = {
  key: string;
  label: string;
  group: "Plan" | "Add-on";
  partnerCost: number;
  techPartnerCost: number;
};

type CountMap = Record<string, number>;

const coinItems: CoinItem[] = [
  { key: "coexisting1y", label: "Co-Existing 1 Year", group: "Plan", partnerCost: 3500, techPartnerCost: 2500 },
  { key: "coexisting3y", label: "Co-Existing 3 Years", group: "Plan", partnerCost: 8000, techPartnerCost: 6000 },
  { key: "standard1y", label: "Standard / Extender 1 Year", group: "Plan", partnerCost: 5000, techPartnerCost: 4000 },
  { key: "standard3y", label: "Standard / Extender 3 Years", group: "Plan", partnerCost: 11000, techPartnerCost: 9000 },
  { key: "flowBuilder", label: "103 - Flow Builder", group: "Add-on", partnerCost: 1500, techPartnerCost: 1000 },
  { key: "catalog", label: "102 - WhatsApp Catalog Management", group: "Add-on", partnerCost: 3000, techPartnerCost: 2000 },
  { key: "campaignUtility", label: "101 - Campaign Utility Templates", group: "Add-on", partnerCost: 1500, techPartnerCost: 1000 },
];

const initialCounts = coinItems.reduce<CountMap>((acc, item) => {
  acc[item.key] = 0;
  return acc;
}, {});

function itemCost(item: CoinItem, partnerKind: PartnerKind) {
  return partnerKind === "partner" ? item.partnerCost : item.techPartnerCost;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(Math.max(0, Math.round(value)));
}

function formatCurrency(value: number) {
  return `₹${formatNumber(value)}`;
}

function toSafeNumber(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export function CoinsCalculator() {
  const [partnerKind, setPartnerKind] = useState<PartnerKind>("partner");
  const [mode, setMode] = useState<CalculatorMode>("wallet");
  const [walletCoins, setWalletCoins] = useState(10000);
  const [walletMix, setWalletMix] = useState<CountMap>(initialCounts);
  const [needMix, setNeedMix] = useState<CountMap>({
    ...initialCounts,
    coexisting1y: 20,
    standard1y: 4,
    flowBuilder: 2,
  });
  const [availableCoins, setAvailableCoins] = useState(0);

  const pricedItems = useMemo(
    () => coinItems.map((item) => ({ ...item, cost: itemCost(item, partnerKind) })),
    [partnerKind]
  );

  const walletMixUsed = useMemo(() => {
    return pricedItems.reduce((total, item) => total + (walletMix[item.key] || 0) * item.cost, 0);
  }, [pricedItems, walletMix]);

  const needCoins = useMemo(() => {
    return pricedItems.reduce((total, item) => total + (needMix[item.key] || 0) * item.cost, 0);
  }, [pricedItems, needMix]);

  const walletBalance = walletCoins - walletMixUsed;
  const needShortfall = Math.max(0, needCoins - availableCoins);
  const rechargeGst = Math.round(needShortfall * 0.18);
  const rechargePayable = needShortfall + rechargeGst;

  const updateCount = (
    setter: Dispatch<SetStateAction<CountMap>>,
    key: string,
    value: string
  ) => {
    setter((previous) => ({ ...previous, [key]: toSafeNumber(value) }));
  };

  return (
    <Card className="rounded-3xl border-border/70 bg-card shadow-xl shadow-brand-primary/10">
      <CardContent className="p-5 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
              <Calculator className="h-3.5 w-3.5" />
              Coins calculator
            </div>
            <h2 id="coins-calculator-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
              Estimate wallet balance, usage, and recharge amount
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Select Partner or Tech Partner pricing, then calculate what your coins can activate or how many coins you need for a planned customer assignment.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <div className="rounded-2xl border border-border/70 bg-surface/60 p-1">
              {(["partner", "techPartner"] as PartnerKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setPartnerKind(kind)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    partnerKind === kind
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-text-secondary hover:bg-card hover:text-text-primary"
                  }`}
                >
                  {kind === "partner" ? "Partner" : "Tech Partner"}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-border/70 bg-surface/60 p-1">
              {([
                ["wallet", "I have coins"],
                ["need", "I need activations"],
              ] as [CalculatorMode, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    mode === value
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-text-secondary hover:bg-card hover:text-text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          {[
            "1 INR = 1 coin",
            "Coins credited exclude GST",
            "Deductions use pre-GST values",
            "Meta message costs stay separate",
          ].map((formula) => (
            <div key={formula} className="rounded-2xl border border-border/70 bg-surface/50 p-4 text-sm font-semibold text-text-primary">
              {formula}
            </div>
          ))}
        </div>

        {mode === "wallet" ? (
          <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="min-w-0 space-y-6">
              <div>
                <Label htmlFor="walletCoins" className="text-sm font-semibold text-text-primary">
                  Current wallet coins
                </Label>
                <Input
                  id="walletCoins"
                  type="number"
                  min={0}
                  value={walletCoins}
                  onChange={(event) => setWalletCoins(toSafeNumber(event.target.value))}
                  className="mt-2 h-12 text-lg font-semibold"
                />
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-text-primary">Maximum activations from this balance</h3>
                <div className="overflow-x-auto rounded-2xl border border-border/70">
                  <table className="min-w-[620px] w-full text-left text-sm">
                    <thead className="bg-surface/70 text-xs uppercase tracking-wider text-text-muted">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Item</th>
                        <th className="px-4 py-3 font-semibold">Type</th>
                        <th className="px-4 py-3 font-semibold">Coins</th>
                        <th className="px-4 py-3 font-semibold">Max</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/70">
                      {pricedItems.map((item) => (
                        <tr key={item.key}>
                          <td className="px-4 py-3 font-semibold text-text-primary">{item.label}</td>
                          <td className="px-4 py-3 text-text-secondary">{item.group}</td>
                          <td className="px-4 py-3 text-text-secondary">{formatNumber(item.cost)}</td>
                          <td className="px-4 py-3 font-semibold text-brand-primary">{Math.floor(walletCoins / item.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-border/70 bg-surface/50 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Custom mix check</h3>
                  <p className="text-sm text-text-secondary">Enter a mix and verify wallet usage.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setWalletMix(initialCounts)}
                  className="border-border bg-card"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
              <div className="space-y-3">
                {pricedItems.map((item) => (
                  <div key={item.key} className="grid grid-cols-[1fr_96px] items-center gap-3">
                    <Label htmlFor={`wallet-${item.key}`} className="text-sm text-text-secondary">
                      {item.label}
                      <span className="block text-xs text-text-muted">{formatNumber(item.cost)} coins each</span>
                    </Label>
                    <Input
                      id={`wallet-${item.key}`}
                      type="number"
                      min={0}
                      value={walletMix[item.key] || 0}
                      onChange={(event) => updateCount(setWalletMix, item.key, event.target.value)}
                      className="text-right"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4">
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-text-secondary">Coins used</span>
                  <span className="font-semibold text-text-primary">{formatNumber(walletMixUsed)}</span>
                </div>
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-text-secondary">{walletBalance >= 0 ? "Coins remaining" : "Shortage"}</span>
                  <span className={`font-semibold ${walletBalance >= 0 ? "text-brand-primary" : "text-red-600"}`}>
                    {formatNumber(Math.abs(walletBalance))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0 rounded-3xl border border-border/70 bg-surface/50 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Planned activations</h3>
                  <p className="text-sm text-text-secondary">Enter the customers and add-ons you want to assign.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNeedMix(initialCounts)}
                  className="border-border bg-card"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
              <div className="space-y-3">
                {pricedItems.map((item) => (
                  <div key={item.key} className="grid grid-cols-[1fr_96px] items-center gap-3">
                    <Label htmlFor={`need-${item.key}`} className="text-sm text-text-secondary">
                      {item.label}
                      <span className="block text-xs text-text-muted">{formatNumber(item.cost)} coins each</span>
                    </Label>
                    <Input
                      id={`need-${item.key}`}
                      type="number"
                      min={0}
                      value={needMix[item.key] || 0}
                      onChange={(event) => updateCount(setNeedMix, item.key, event.target.value)}
                      className="text-right"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 space-y-5">
              <div className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Coins className="h-6 w-6 text-brand-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Coins needed</h3>
                    <p className="text-sm text-text-secondary">Plan/add-on deduction only.</p>
                  </div>
                </div>
                <p className="text-4xl font-bold text-brand-primary">{formatNumber(needCoins)}</p>
                <p className="mt-2 text-sm text-text-secondary">Plan/add-on deduction = listed coin value only</p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-5">
                <Label htmlFor="availableCoins" className="text-sm font-semibold text-text-primary">
                  Existing wallet coins, if any
                </Label>
                <Input
                  id="availableCoins"
                  type="number"
                  min={0}
                  value={availableCoins}
                  onChange={(event) => setAvailableCoins(toSafeNumber(event.target.value))}
                  className="mt-2 h-11"
                />
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Recharge base amount</span>
                    <span className="font-semibold text-text-primary">{formatCurrency(needShortfall)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">GST at 18%</span>
                    <span className="font-semibold text-text-primary">{formatCurrency(rechargeGst)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                    <span className="font-semibold text-text-primary">Payable recharge amount</span>
                    <span className="font-bold text-brand-primary">{formatCurrency(rechargePayable)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 text-sm leading-relaxed text-text-secondary">
                <Wallet className="mb-2 h-5 w-5 text-brand-primary" />
                Coins credited = recharge base amount. GST is paid on recharge but is not credited as coins.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
