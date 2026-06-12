type RegisterHeaderProps = {
  title: string;
  description: string;
};

export default function RegisterHeader({ title, description }: RegisterHeaderProps) {
  return (
    <div className="bg-[#112240] text-white p-6 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-xs text-gray-300 mt-2 font-medium">{description}</p>
    </div>
  );
}
