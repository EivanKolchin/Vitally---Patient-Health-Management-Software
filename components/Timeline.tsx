"use client";

interface TimelineProps {
  patient: any;
  riskScore: any;
}

export default function Timeline({ patient, riskScore }: TimelineProps) {
  // Generate timeline events
  const generateEvents = () => {
    const events = [];

    // Surgery event
    const surgeryTime = new Date(
      Date.now() - patient.timeSinceSurgeryHours * 60 * 60 * 1000
    );
    events.push({
      time: surgeryTime,
      type: "surgery",
      title: "Surgery Completed",
      description: patient.surgeryType,
      icon: "surgery",
    });

    // Lab draw events
    if (patient.labs.WBC && patient.labs.WBC.length > 0) {
      patient.labs.WBC.forEach((lab: any) => {
        events.push({
          time: new Date(lab.time),
          type: "lab",
          title: "Lab Draw",
          description: `WBC: ${lab.value.toFixed(1)} ×10⁹/L`,
          icon: "lab",
        });
      });
    }

    // Fever spikes
    const tempData =
      patient.vitals.find((v: any) => v.type === "TEMP")?.data || [];
    tempData.forEach((temp: any) => {
      if (temp.value >= 38.5) {
        events.push({
          time: new Date(temp.time),
          type: "fever",
          title: "Fever Spike",
          description: `Temperature: ${temp.value.toFixed(1)}°C`,
          icon: "fever",
        });
      }
    });

    // Sort by time (most recent first)
    return events.sort((a, b) => b.time.getTime() - a.time.getTime());
  };

  const events = generateEvents();

  const getIcon = (type: string) => {
    switch (type) {
      case "surgery":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        );
      case "lab":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
        );
      case "fever":
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        );
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    const diffMins = Math.floor(
      ((now.getTime() - date.getTime()) % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return `${diffMins}m ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">
          Clinical Timeline
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Events */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Icon */}
              <div className="relative z-10">{getIcon(event.type)}</div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {event.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatTime(event.time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Active Risk Factors
          </span>
          <span className="text-sm font-bold text-gray-900">
            {riskScore.totalScore} / 5
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {riskScore.factors.lowSBP && (
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
              Hypotension
            </span>
          )}
          {riskScore.factors.highRR && (
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
              Tachypnea
            </span>
          )}
          {riskScore.factors.abnormalWBC && (
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
              Abnormal WBC
            </span>
          )}
          {riskScore.factors.elevatedLactate && (
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
              High Lactate
            </span>
          )}
          {riskScore.factors.abnormalTemp && (
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded">
              Fever/Hypothermia
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

