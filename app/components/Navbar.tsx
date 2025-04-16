import Link from "next/link";

const Navbar = () => (
  <nav className="bg-[#48A6A7] text-white px-6 py-3 flex items-center justify-between shadow">
    <div className="font-bold text-lg tracking-wide text-[#F2EFE7]">FotoShare</div>
    <ul className="flex gap-6">
      <li>
        <Link href="/" className="hover:text-[#9ACBD0] transition-colors duration-200">Home</Link>
      </li> 
    </ul>
  </nav>
);

export default Navbar;
