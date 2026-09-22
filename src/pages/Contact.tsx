import BreadCrumb from "../components/BreadCrumb";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    await new Promise((r) => setTimeout(r, 700));

    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  const inputClass =
    "w-full rounded-xl border border-primary-dark/10 bg-dark-white/60 px-4 py-3 text-[14.5px] text-primary-dark outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

      <BreadCrumb
        title="Contact"
        paths={[{ title: "Contact", link: "/contact" }]}
      />

      <section className="bg-dark-white pb-16">
        <div className="container">
          {/* Header card */}
          <div className="-mt-6 rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail size={22} />
              </span>
              <div>
                <h1 className="font-josefin text-[24px] font-bold text-primary-dark sm:text-[28px]">
                  Get in Touch
                </h1>
                <p className="mt-0.5 text-[13.5px] text-gray-500">
                  Questions about an order or a product? We'd love to hear from
                  you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* LEFT — contact info */}
            <div className="space-y-4 lg:col-span-2">
              {/* Address */}
              <div className="flex items-start gap-4 rounded-2xl border border-primary-dark/10 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Address
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-primary-dark">
                    Kapan, Kathmandu
                    <br />
                    Bagmati Province, Nepal
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-2xl border border-primary-dark/10 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Phone
                  </p>
                  <a
                    href="tel:+9779800000000"
                    className="mt-1 block text-[14.5px] text-primary-dark transition-colors hover:text-primary"
                  >
                    +977 98-0000-0000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 rounded-2xl border border-primary-dark/10 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Email
                  </p>
                  <a
                    href="mailto:support@furnew.com"
                    className="mt-1 block text-[14.5px] text-primary-dark transition-colors hover:text-primary"
                  >
                    support@furnew.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 rounded-2xl border border-primary-dark/10 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Working Hours
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-primary-dark">
                    Sun – Fri · 9:00 AM – 6:00 PM
                    <br />
                    Saturday · Closed
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="flex h-44 items-center justify-center rounded-2xl border border-primary-dark/10 bg-dark-white">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto text-primary" />
                  <p className="mt-2 text-[13px] text-gray-500">
                    Kapan, Kathmandu
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-primary-dark/10 bg-white p-6 sm:p-8"
              >
                <h2 className="font-josefin text-[20px] font-bold text-primary-dark">
                  Send us a message
                </h2>
                <p className="mt-1 text-[13.5px] text-gray-500">
                  We usually reply within 24 hours.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="What is this about?"
                    className={inputClass}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-[13px] font-medium text-primary-dark">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us how we can help..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14.5px] font-semibold text-white transition-all duration-200 ${
                    sending
                      ? "cursor-not-allowed bg-primary/50"
                      : "cursor-pointer bg-primary shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                  }`}
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11.5px] text-gray-400">
                  We'll never share your information with anyone else.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;