'use client';

export default function BookingModal() {
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out, Jennifer will review your request within 24 business hours!");
    const checker = document.getElementById('booking-toggle') as HTMLInputElement;
    if (checker) checker.checked = false;
  };

  return (
    <>
      <input type="checkbox" id="booking-toggle" className="hidden peer" />
      <div className="fixed inset-0 bg-[#5D4037]/50 backdrop-blur-sm z-50 hidden peer-checked:flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full p-8 relative shadow-xl border border-[#5D4037]/20">
          <label htmlFor="booking-toggle" className="absolute top-4 right-5 text-2xl font-light cursor-pointer text-[#5D4037] hover:opacity-60">&times;</label>
          
          <h3 className="font-serif text-2xl text-[#5D4037] mb-2">Request Consultation</h3>
          <p className="text-xs text-[#5D4037]/80 mb-6">Let's map out your bespoke wardrobe timeline configuration.</p>
          
          <form onSubmit={handleSubmission} className="space-y-4">
            <div>
              <input type="text" placeholder="First Name" required className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-3 text-sm text-[#5D4037] placeholder:text-[#5D4037]/40 focus:outline-none focus:border-[#5D4037]" />
            </div>
            <div>
              <input type="email" placeholder="Email Address" required className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-3 text-sm text-[#5D4037] placeholder:text-[#5D4037]/40 focus:outline-none focus:border-[#5D4037]" />
            </div>
            <div>
              <select required defaultValue="" className="w-full bg-[#FFFFFF] border border-[#5D4037]/20 rounded-xl p-3 text-sm text-[#5D4037] focus:outline-none focus:border-[#5D4037] appearance-none">
                <option value="" disabled>Select Service Interest</option>
                <option value="styling">Personal Styling</option>
                <option value="closet">Closet Audit</option>
                <option value="shopping">Personal Shopping</option>
                <option value="events">Event Styling</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#5D4037] text-[#FFFFFF] rounded-xl p-3 text-xs font-bold tracking-widest uppercase hover:bg-[#5D4037]/80 transition-colors mt-2">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
}