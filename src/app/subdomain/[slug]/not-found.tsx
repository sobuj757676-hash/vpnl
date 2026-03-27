export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-zinc-50 dark:bg-black px-4 text-center">
      <h1 className="text-6xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">
        Product Not Found
      </h2>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        The VPN product you are looking for does not exist or has not been published yet.
      </p>
      <a
        href="https://abcd.com"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Go to Main Site
      </a>
    </div>
  )
}
