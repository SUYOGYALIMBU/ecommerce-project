import BreadCrumb from "../components/BreadCrumb";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <BreadCrumb title="Contact" paths={[{ title: "Contact", link: "/contact" }]} />

      <section className="bg-dark-white py-14">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-primary-dark/10 bg-white p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <MapPin size={18} />
            </span>
            <h3 className="mt-4 font-josefin text-[16px] font-semibold text-primary-dark">
              Address
            </h3>
            <p className="mt-2 text-[14px] text-gray-500">
              Kupondole, Lalitpur
              <br />
              Kathmandu Valley, Nepal
            </p>
          </div>

          <div className="rounded-2xl border border-primary-dark/10 bg-white p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <Phone size={18} />
            </span>
            <h3 className="mt-4 font-josefin text-[16px] font-semibold text-primary-dark">
              Phone
            </h3>
            <p className="mt-2 text-[14px] text-gray-500">
              +977 98-0000-0000
            </p>
          </div>

          <div className="rounded-2xl border border-primary-dark/10 bg-white p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mail size={18} />
            </span>
            <h3 className="mt-4 font-josefin text-[16px] font-semibold text-primary-dark">
              Email
            </h3>
            <p className="mt-2 text-[14px] text-gray-500">
              support@furnew.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;