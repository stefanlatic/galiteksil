import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

const JWT_SECRET = process.env.JWT_SECRET || "tajna_lozinka";

export default async function MojNalog() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Пријава</h1>
        <p>Морате се пријавити да бисте видели свој налог.</p>
        <Link href="/login" className="text-yellow-600 underline">
          Иди на пријаву
        </Link>
      </div>
    );
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    // Ako je admin:
    if (user.role === "admin") {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Админ панел</h1>
          <p>Овде можеш додавати производе и управљати сајтом.</p>
        </div>
      );
    }

    // Ako je običan korisnik:
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">Мој налог</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Информације о налогу</h2>
          <p className="font-medium">Контактне информације</p>
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <div className="flex space-x-4 mt-2">
            <button className="text-blue-600 underline">Измени</button>
            <button className="text-blue-600 underline">Промени лозинку</button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Адресе</h2>
          <p className="font-medium">Подразумевана адреса за наплату</p>
          <p>{user.firstName} {user.lastName}</p>
          <p>Нема адресе сачуване</p>
          <button className="text-blue-600 underline mt-1">Додај адресу</button>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Твоје поруџбине</h2>
          <button className="text-blue-600 underline mb-2">Погледај све</button>

          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Датум</th>
                <th className="p-2 border">Испорука за</th>
                <th className="p-2 border">Укупно</th>
                <th className="p-2 border">Статус</th>
                <th className="p-2 border">Акција</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">0001</td>
                <td className="p-2 border">22.07.2025.</td>
                <td className="p-2 border">Ниш</td>
                <td className="p-2 border">4.999 дин.</td>
                <td className="p-2 border">У току</td>
                <td className="p-2 border text-blue-600 underline">Детаљи</td>
              </tr>
            </tbody>
          </table>
        </section>

        <form action="/api/logout" method="POST">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md">
            Одјави се
          </button>
        </form>
      </div>
    );
  } catch (err) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Неисправан или истекао токен.</p>
        <Link href="/login" className="text-yellow-600 underline">Поново се пријави</Link>
      </div>
    );
  }
}
