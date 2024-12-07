import React from 'react';

function Newsletter() {
  return (
    <div className="mx-6 sm:mx-12 lg:mx-24 mb-20 rounded-3xl bg-blue-100 mt-10">
      <div className="py-12 sm:py-20 lg:py-20">
        <div className="text-blue-500 font-pop font-semibold text-lg pl-6 sm:pl-12 lg:pl-16 pb-4">OUR NEWSLETTER</div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          {/* Left Column: Text */}
          <div className="max-w-xl sm:text-4xl lg:col-span-7 font-pop">
            <h2 className="inline sm:block lg:inline xl:block text-3xl font-semibold pb-3">
              Stay Ahead of the Market with Our Newsletter
            </h2>
            <p className="text-base">
              Subscribe for the latest stock insights, trading tips, platform updates, and competition news.
              Enhance your trading skills with exclusive content delivered straight to your inbox.
            </p>
          </div>

          {/* Right Column: Form */}
          <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
            <div className="flex gap-x-4 flex-col sm:flex-row lg:flex-row">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-white font-pop min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="font-pop flex rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 mt-4 sm:mt-0"
              >
                <span className="pl-28 md:pl-0">Subscribe</span>
              </button>
            </div>
            <p className="mt-4 text-sm leading-6">We care about your data. Read our <a href="https://www.swellai.com/privacy" className="font-semibold">privacy&nbsp;policy</a>.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
