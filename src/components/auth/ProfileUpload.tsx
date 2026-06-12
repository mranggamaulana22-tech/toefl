type ProfileUploadProps = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  profilePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickUpload: () => void;
};

export default function ProfileUpload({
  fileInputRef,
  profilePreview,
  onImageChange,
  onClickUpload,
}: ProfileUploadProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={onClickUpload}
        className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:bg-gray-100 transition-all group relative"
      >
        {profilePreview ? (
          <img src={profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-gray-400 group-hover:text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </div>
        )}
      </button>
      <span
        className="text-xs font-bold text-gray-500 mt-2 tracking-wide cursor-pointer"
        onClick={onClickUpload}
      >
        Upload Profile Picture
      </span>
    </div>
  );
}
