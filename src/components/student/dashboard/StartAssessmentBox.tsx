// src/components/student/dashboard/StartAssessmentBox.tsx
'use client';

interface StartAssessmentBoxProps {
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
  onStart: () => void;
  hasTakenTest: boolean;
}

export default function StartAssessmentBox({ isReady, setIsReady, onStart }: StartAssessmentBoxProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#0a192f] rounded-lg text-white mt-0.5 shadow-inner">🚀</div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Start Assessment</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Unlock your personalized analytical suite and AI recommendations.
          </p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-900">
        <span className="text-base mt-0.5">⚠️</span>
        <div className="text-xs space-y-1">
          <strong className="font-bold block text-red-950">Important Notice</strong>
          <p className="leading-relaxed opacity-90 font-medium">
            Ensure a stable internet connection. The assessment cannot be paused once started. All progress is monitored by the AI Proctoring system.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 pt-1">
        <input 
          type="checkbox" 
          id="agree-test" 
          checked={isReady}
          onChange={(e) => setIsReady(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded text-[#0a192f] border-slate-300 focus:ring-[#0a192f]"
        />
        <label htmlFor="agree-test" className="text-xs text-slate-600 leading-normal cursor-pointer font-medium">
          I am ready to begin the assessment and understand that my performance will be used to calibrate my AI Learning Path.
        </label>
      </div>

      <button
        onClick={onStart}
        disabled={!isReady}
        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          isReady 
            ? 'bg-[#0a192f] hover:bg-[#112240] text-white shadow-md active:scale-[0.99]' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
        }`}
      >
        Start TOEFL Assessment ➔
      </button>
    </div>
  );
}