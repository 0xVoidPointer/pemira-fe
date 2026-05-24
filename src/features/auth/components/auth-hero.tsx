export function AuthHero() {
  return (
    <>
      <img
        src="udinus.webp"
        className="object-cover object-right h-full w-full"
        alt="Udinus Campus"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent" />

      <div className="absolute inset-0 flex items-end md:items-center p-4 md:p-8">
        <div className="text-white">
          <h2 className="text-lg md:text-2xl font-semibold">
            Selamat Datang di PEMIRA
          </h2>
          <p className="mt-1 text-sm md:text-base opacity-90 max-w-xs">
            Masuk menggunakan akun universitas untuk berpartisipasi dalam
            pemilihan mahasiswa.
          </p>
        </div>
      </div>
    </>
  );
}
