export default function BoxDisplay({ label, value }: { label: any; value: any; }) {
    return (
      <div className="w-full md:w-auto mr-6">
        <div className="border-x-2 border-t-2 text-2xl text-center w-full md:w-auto rounded-t border-[#A7ADBB] text-[#A7ADBB]">
          <p className="px-3">{label}</p>
        </div>
        <div className="text-3xl border-x-2 border-b-2 border-[#A7ADBB] text-center bg-[#A7ADBB] text-black rounded-b">
          <p>{value}</p>
        </div>
      </div>
    );
  }
  