"use client";

import { useState, useEffect } from "react";

export default function MojNalogClient({ user }) {
  const [modal, setModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [address, setAddress] = useState(null); // za čuvanje adrese
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(user); // Local state to update UI

  const closeModal = () => {
    setModal(null);
    setErrors({});
    // Reset form fields to initial values except for user data
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      street: "",
      city: "",
      postalCode: "",
    });
  };

  const closeConfirmModal = () => setConfirmModal(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: null, form: null }));
  };

  const handleSubmit = async (type) => {
    let newErrors = {};

    if (type === "edit") {
      if (!validateEmail(formData.email)) {
        newErrors.email = "Унесите важећу email адресу";
      }
    } else if (type === "password") {
      if (!formData.oldPassword) {
        newErrors.oldPassword = "Унесите стару лозинку";
      }
      if (!validatePassword(formData.newPassword)) {
        newErrors.newPassword =
          "Лозинка мора имати најмање 8 карактера, велико слово, број и специјални карактер";
      }
      if (formData.newPassword !== formData.repeatPassword) {
        newErrors.repeatPassword = "Лозинке се не подударају";
      }
    } else if (type === "address") {
      if (!formData.street) newErrors.street = "Унесите улицу и број";
      if (!formData.city) newErrors.city = "Унесите град";
      if (!formData.postalCode) newErrors.postalCode = "Унесите поштански број";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setConfirmModal(type); // Show confirmation modal
  };

  const confirmAction = async () => {
    try {
      if (confirmModal === "edit") {
        const response = await fetch("/api/update-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          }),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser); // Update local user data
          closeModal();
          closeConfirmModal();
        } else {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Грешка при ажурирању профила" });
        }
      } else if (confirmModal === "password") {
        const response = await fetch("/api/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }),
        });
        if (response.ok) {
         const savedAddress = await response.json();
          setUserData((prev) => ({
            ...prev,
            address: savedAddress,
          }));
          setAddress(savedAddress); // opciono ako koristiš poseban state

          closeModal();
          closeConfirmModal();
        } else {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Грешка при промени лозинке" });
        }
      } else if (confirmModal === "address") {
        const response = await fetch("/api/add-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
          }),
        });
        if (response.ok) {
          const savedAddress = await response.json();
            setUserData((prev) => ({
              ...prev,
              address: savedAddress,
            }));
          setAddress(savedAddress); // opciono ako koristiš poseban state
          closeModal();
          closeConfirmModal();
        } else {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Грешка при додавању адресе" });
        }
      }
    } catch (error) {
      setErrors({ form: "Дошло је до грешке. Покушајте поново." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Мој налог</h1>

      {/* Информације о налогу */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Информације о налогу</h2>
        <p className="font-medium">Контактне информације</p>
        <p>{userData.firstName} {userData.lastName}</p>
        <p>{userData.email}</p>
        <div className="flex space-x-4 mt-2">
          <button onClick={() => setModal("edit")} className="text-blue-600 underline cursor-pointer">
            Измени
          </button>
          <button onClick={() => setModal("password")} className="text-blue-600 underline cursor-pointer">
            Промени лозинку
          </button>
        </div>
      </section>

      {/* Адресе */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Адресе</h2>
        <p className="font-medium">Подразумевана адреса за наплату</p>
         {userData.address ? (
          <div className="space-y-1">
            <p>{userData.firstName} {userData.lastName}</p>
            <p>{userData.address.street}</p>
            <p>{userData.address.postalCode} {userData.address.city}</p>
          </div>
        ) : (
          <p>Нема адресе сачуване</p>
        )}
        <button onClick={() => setModal("address")} className="text-blue-600 underline mt-1 cursor-pointer">
          Додај адресу
        </button>
      </section>

      {/* Поруџбине */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Твоје поруџбине</h2>
        <button onClick={() => setModal("orders")} className="text-blue-600 underline mb-2 cursor-pointer">
          Погледај све
        </button>
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
              <td className="p-2 border text-blue-600 underline cursor-pointer">Детаљи</td>
            </tr>
          </tbody>
        </table>
      </section>

      <form action="/api/logout" method="POST">
        <button className="text-red-600 underline cursor-pointer">Одјави се</button>
      </form>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-transparent flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={closeModal}
            >
              ×
            </button>

            {modal === "edit" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Измени податке</h2>
                {errors.form && <p className="text-red-600 mb-2">{errors.form}</p>}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="firstName"
                      placeholder="Име"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="lastName"
                      placeholder="Презиме"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit("edit")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Сачувај
                  </button>
                </form>
              </>
            )}

            {modal === "password" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Промени лозинку</h2>
                {errors.form && <p className="text-red-600 mb-2">{errors.form}</p>}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input
                      type="password"
                      className="w-full border p-2 rounded"
                      name="oldPassword"
                      placeholder="Стара лозинка"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                    />
                    {errors.oldPassword && (
                      <p className="text-red-600 text-sm">{errors.oldPassword}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      className="w-full border p-2 rounded"
                      name="newPassword"
                      placeholder="Нова лозинка"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    {errors.newPassword && (
                      <p className="text-red-600 text-sm">{errors.newPassword}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      className="w-full border p-2 rounded"
                      name="repeatPassword"
                      placeholder="Поновите лозинку"
                      value={formData.repeatPassword}
                      onChange={handleInputChange}
                    />
                    {errors.repeatPassword && (
                      <p className="text-red-600 text-sm">{errors.repeatPassword}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit("password")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Промени
                  </button>
                </form>
              </>
            )}

            {modal === "address" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Додај адресу</h2>
                {errors.form && <p className="text-red-600 mb-2">{errors.form}</p>}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="street"
                      placeholder="Улица и број"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                    {errors.street && <p className="text-red-600 text-sm">{errors.street}</p>}
                  </div>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="city"
                      placeholder="Град"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                  </div>
                  <div>
                    <input
                      className="w-full border p-2 rounded"
                      name="postalCode"
                      placeholder="Поштански број"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    {errors.postalCode && (
                      <p className="text-red-600 text-sm">{errors.postalCode}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit("address")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Сачувај адресу
                  </button>
                </form>
              </>
            )}

            {modal === "orders" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Све поруџбине</h2>
                <p>Овде ће ићи комплетна листа поруџбина (dummy data за сад).</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-transparent flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={closeConfirmModal}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Потврда</h2>
            <p className="mb-4">Да ли сте сигурни да желите да промените податке?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeConfirmModal}
                className="text-gray-600 px-4 py-2 rounded"
              >
                Откажи
              </button>
              <button
                onClick={confirmAction}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Потврди
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}