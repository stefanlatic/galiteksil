"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const items = [
    { alt: "Master Card", src: "/images/mc_acc_opt.png" },
    { alt: "Maestro Card", src: "/images/ms_acc_opt.png" },
    {
      alt: "Visa",
      src: "/images/visa.png",
      href: "https://rs.visa.com/",
    },
    {
      alt: "Banka Intesa",
      src: "/images/bancaIntesa.png",
      href: "http://www.bancaintesa.rs/pocetna.1.html",
      className: "w-[100px]"
    },
    {
      alt: "Dina",
      src: "/images/dina-extra.png",
      href: "https://dinacard.nbs.rs/",
    },
    {
      alt: "WS pay",
      src: "/images/wsPayWebSecureLogo.png",
      href: "https://www.wspay.rs/",
    },
    {
      alt: "MasterCard SecureCode",
      src: "/images/masterCardSC.png",
      href: "https://www.mastercard.rs/sr-rs/consumers/find-card-products/credit-cards.html",
    },
    {
      alt: "Verified by Visa",
      src: "/images/verifiedbyvisa.png",
      href: "http://rs.visa.com/rs/rs-rs/protectedeverywhere/index.html",
    },
  ];

  return (
    <footer className="bg-gray-100 py-4">
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 px-6 md:grid-cols-4 gap-6">

        {/* Korisnički servis */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Кориснички сервис</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="">Услови коришћења</a></li>
            <li><a href="">Услови продаје</a></li>
            <li><a href="">Политика приватности</a></li>
            <li><a href="">Корисничка подршка</a></li>
            <li><a href="">Провери статус поруџбине</a></li>
            <li><a href="">Замена производа</a></li>
            <li><a href="">Повраћај средстава</a></li>
            <li><a href="">Рекламације</a></li>
            <li><a href="">Примедбе и жалбе</a></li>
          </ul>
        </div>

        {/* Pomoć pri kupovini */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Помоћ при куповини</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="">Како купити</a></li>
            <li><a href="">Начини плаћања</a></li>
            <li><a href="">Плаћање картицом</a></li>
            <li><a href="">Плаћање картицом на рате</a></li>
            <li><a href="">Начини испоруке</a></li>
          </ul>
        </div>

        {/* Informacije */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Информације</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="">O нама</a></li>
            <li><a href="">Синдикална продаја</a></li>
            <li><a href="">Наше продавнице</a></li>
            <li><a href="">Sitemap</a></li>
          </ul>
        </div>
            <div className="max-w-xl mx-auto text-center">
        <h5 className="text-lg font-semibold mb-2">Пратите нас</h5>
        <p className="text-sm text-gray-600 mb-4">
          Сазнајте све о нашим понудама и попустима на нашим фејсбук и инстаграм страницама.
        </p>

        <div className="flex justify-center gap-6">
          {/* Instagram */}
          <a
            href=""
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <FaInstagram className="w-8 h-8" />
            
          </a>

          {/* Facebook */}
          <a
            href=""
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
                <FaFacebook className="w-8 h-8" />
          </a>
        </div>
      </div>
      </div>
    </div>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-6">
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.alt}
            >
              <Image src={item.src} alt={item.alt} width={80} height={40} />
            </Link>
          ) : (
            <Image
              key={index}
              src={item.src}
              alt={item.alt}
              width={80}
              height={40}
            />
          )
        )}
      </div>
      <div className="flex justify-center mt-2">
        <p>©2025 www.galitekstil.com, Сва права задржана.</p>
      </div>
    </footer>
  );
}
