import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Phone, MapPin, Clock, Send, HelpCircle } from "lucide-react";
import BreadCrumb from "../components/BreadCrumb";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–5 business days within Nepal. Remote areas may take up to 7 days.",
  },
  {
    q: "Can I return a product?",
    a: "Yes — you can return any item within 7 days of delivery if it's unused and in original packaging.",
  },
  {
    q: "Do you offer assembly?",
    a: "Free assembly is included for all large furniture items within Kathmandu Valley.",
  },
  {
    q: "How do I become a seller?",
    a: "Create an account and check 'Register as Seller' during signup. Then head to My Products.",
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const onSubmit = async (form: ContactForm) => {
    // Mock submit — no backend. For viva demo this is enough.
    console.log("Contact form:", form);

    await new Promise((r) => setTimeout(r, 600));

    toast.success("Message sent! We'll get back to you soon.");
    reset();
  };

  const inputClass =
    "w-full rounded-xl border border-primary-dark/10 bg-dark-white/60 px-4 py-3.5 text-[15px] text-primary-dark outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  const labelClass = "mb-1.5 block text-[13px] font-medium text-primary-dark";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

      <BreadCrumb title="Contact" paths={[{ title: "Contact", link: "/contact" }]} />

      <section className="bg-white py-14">
        <div className="container grid gap-10 lg:grid-cols-5">
          {/* ---------- Left: contact info ---------- */}
          <div className="lg:col-span-2">
            <h1 className="font-josefin text-[32px] font-bold text-primary-dark">
              Get in touch
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              Questions about an order, a product, or becoming a seller? Send
              us a message and we'll reply within 24 hours.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    Address
                  </p>
                  <p className="mt-0.5 text-[15px] text-primary-dark">
                    Kupondole, Lalitpur
                    <br />
                    Kathmandu Valley, Nepal
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    Phone
                  </p>
                  <a
                    href="tel:+9779800000000"
                    className="mt-0.5 block text-[15px] text-primary-dark hover:text-primary"
                  >
                    +977 98-0000-0000
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    Email
                  </p>
                  <a
                    href="mailto:support@furnew.com"
                    className="mt-0.5 block text-[15px] text-primary-dark hover:text-primary"
                  >
                    support@furnew.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    Working hours
                  </p>
                  <p className="mt-0.5 text-[15px] text-primary-dark">
                    Sun – Fri · 9:00 AM – 6:00 PM
                    <br />
                    Saturday · Closed
                  </p>
                </div>
              </li>
            </ul>

            {/* Map placeholder */}
            <div className="mt-8 flex h-48 items-center justify-center rounded-2xl border border-primary-dark/10 bg-dark-white">
              <div className="text-center">
                <MapPin size={28} className="mx-auto text-primary" />
                <p className="mt-2 text-[13px] text-gray-500">
                  Map view · Kupondole, Lalitpur
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Right: contact form ---------- */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-primary-dark/10 bg-white p-6 shadow-[0_25px_60px_-40px_rgba(62,44,35,0.35)] sm:p-8"
            >
              <h2 className="font-josefin text-[22px] font-bold text-primary-dark">
                Send us a message
              </h2>
              <p className="mt-1 text-[14px] text-gray-500">
                Fields marked with * are required.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Your Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className={inputClass}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Subject *</label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className={inputClass}
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label className={labelClass}>Message *</label>
                <textarea
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className={`${inputClass} resize-none`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-bold tracking-wide text-white transition-all duration-200 ${
                  isSubmitting
                    ? "cursor-not-allowed bg-primary/50"
                    : "cursor-pointer bg-primary shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
                }`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ---------- FAQ section ---------- */}
      <section className="border-t border-primary-dark/10 bg-dark-white py-14">
        <div className="container">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-primary" size={22} />
            <h2 className="font-josefin text-[24px] font-bold text-primary-dark">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-primary-dark/10 bg-white p-6"
              >
                <h3 className="font-josefin text-[16px] font-semibold text-primary-dark">
                  {f.q}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;