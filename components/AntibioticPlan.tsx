"use client";

import { useState } from "react";

interface AntibioticPlanProps {
  recommendation: any;
  explanation: any;
  hospital: any;
}

export default function AntibioticPlan({
  recommendation,
  explanation,
  hospital,
}: AntibioticPlanProps) {
  const [showRationale, setShowRationale] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyNote = () => {
    navigator.clipboard.writeText(explanation.noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Main Recommendation Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">
              Recommended Antibiotic Regimen
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRationale(!showRationale)}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              {showRationale ? "Hide" : "Show"} Rationale
            </button>
            <button
              onClick={handleCopyNote}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy Note
                </>
              )}
            </button>
          </div>
        </div>

        {/* Short Rationale */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">{explanation.shortRationale}</p>
        </div>

        {/* Primary Regimen */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Primary Regimen
            </h3>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-xs text-gray-600 font-medium">
                  Antibiotic
                </span>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {recommendation.primaryRegimen.antibioticName}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600 font-medium">Dose</span>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {recommendation.primaryRegimen.dose}{" "}
                  {recommendation.primaryRegimen.route}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600 font-medium">
                  Frequency
                </span>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {recommendation.primaryRegimen.frequency}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600 font-medium">
                  Duration
                </span>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {recommendation.primaryRegimen.durationDays} days
                </p>
              </div>
            </div>
            {recommendation.primaryRegimen.notes && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Note:</span>{" "}
                    {recommendation.primaryRegimen.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Regimen */}
        {recommendation.alternativeRegimen && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                Alternative Regimen
              </h3>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-5">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-gray-600 font-medium">
                    Antibiotic
                  </span>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {recommendation.alternativeRegimen.antibioticName}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 font-medium">
                    Dose
                  </span>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {recommendation.alternativeRegimen.dose}{" "}
                    {recommendation.alternativeRegimen.route}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 font-medium">
                    Frequency
                  </span>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {recommendation.alternativeRegimen.frequency}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 font-medium">
                    Duration
                  </span>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {recommendation.alternativeRegimen.durationDays} days
                  </p>
                </div>
              </div>
              {recommendation.alternativeRegimen.notes && (
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-gray-700">
                      {recommendation.alternativeRegimen.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resistance Summary */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Local Antibiogram Data
          </h4>
          <p className="text-sm text-gray-700">
            {recommendation.rationaleInputs.resistanceSummary}
          </p>
        </div>
      </div>

      {/* Detailed Rationale (collapsible) */}
      {showRationale && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Clinical Rationale
          </h3>
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-700 whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: explanation.detailedRationale
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </div>
      )}

      {/* Clinical Note Preview */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Clinical Note
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs text-gray-800 whitespace-pre-wrap overflow-x-auto">
          {explanation.noteText}
        </div>
      </div>
    </div>
  );
}

