
window.onload = () => {



  getSessions();

  // if (!window.location.hash) {
  //   window.location = window.location + '#loaded';
  //   window.location.reload();
  // }

  document.querySelector(".main").style.display = "none";

  setTimeout(() => {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loader").style.display = "none";
  }, 4000)

  if (document.querySelector("#place").value === "our place") {

    document.querySelector("#my_address").style.display = "block"
    document.querySelector("#address_note").style.display = "none"
    document.querySelector("#address_label").style.display = "none"
    document.querySelector("#address").style.display = "none"
  }
}

document.querySelector("#place").addEventListener("change", (e) => {
  document.querySelector("#address_note").style.display = e.target.value === "your place" ? "block" : "none"
  document.querySelector("#address_label").style.display = e.target.value === "your place" ? "block" : "none"
  document.querySelector("#address").style.display = e.target.value === "your place" ? "block" : "none"
  document.querySelector("#my_address").style.display = e.target.value === "your place" ? "none" : "block"
})

// language setup
const translations = {
  en: {

    land_1: "YOUR BOOKED MAKEUP SESSIONS",
    land_2: "OUR CONTACTS",
    land_3: "WHATSAPP",
    land_4: `OUR LOCATION:`,
    land_5: "JUST LITTLE MAGIC TOUCH IS WAITING..",
    land_6: "IF YOU HAVE (PER WEDDING , GRADUATION , PARTY, DATE , ETC..)",
    land_7: "OR IF YOU WANT TO SURPRISE YOUR PARTNER , WE GOT YOU",
    land_8: "WE WILL MAKE YOU BLOOM BEAUTY, EVERYWHERE YOU GO",
    land_9: "BOOK FOR YOUR MAKEUP SESSION BELOW:",
    land_10: "YOUR NAME",
    land_11: "YOUR PHONE",
    land_12: "WHAT'S THE OCCASION?",
    land_13: "pre-wedding (300k)",
    land_14: "engagement (250k)",
    land_15: "graduation (200k)",
    land_16: "photoshoot (200k)",
    land_17: "party (200k)",
    land_18: "meeting (200k)",
    land_19: "date (200k)",
    land_20: "WHERE YOU LIKE TO START YOUR MAKEUP SESSION?",
    land_21: "our place",
    land_22: "your place",
    land_23: "YOUR ADDRESS",
    land_24: "EXTRA MONEY WILL BE ADDED TO THE PRICE (IT'S NEGOTIABLE)",
    land_25: "PICK THE DAY FOR YOUR MAKEUP SESSION?",
    land_26: "PICK THE TIME FOR YOUR MAKEUP SESSION?",
    land_27: "BOOK NOW",
    land_28: "WE WILL CALL YOU FOR YOUR MAKEUP SESSION ON THE DATE YOU CHOOSE",
    land_29: "PLEASE MAKE SURE YOU PROVIDE THE CORRECT PHONE NUMBER",
    land_30: "YOUR MAKEUP SESSIONS YOU BOOKED",
    land_31: "BOOKED MAKEUP SESSIONS FOUND FOR YOU!",
    land_32: "MAKEUP SESSION OCCASION:",
    land_33: "MAKEUP SESSION  DATE :",
    land_34: "MAKEUP SESSION  TIME :",
    land_35: "MAKEUP SESSION  PLACE :",
  },

  in: {
    land_1: "SESI MAKEUP YANG ANDA PESAN",
    land_2: "KONTAK KAMI",
    land_3: "WHATSAPP",
    land_4: `LOKASI KAMI:`,
    land_5: "HANYA SENTUHAN AJAIB SEDIKIT YANG MENUNGGU..",
    land_6: "JIKA ANDA MEMILIKI (PER PERNIKAHAN, WISUDA, PESTA, TANGGAL, DLL..)",
    land_7: "ATAU JIKA ANDA INGIN MENGEJUTKAN MITRA ANDA, KAMI MENYEDIAKAN ANDA",
    land_8: "KAMI AKAN MEMBUAT ANDA KECANTIKAN, KE MANA SAJA ANDA PERGI",
    land_9: "PESAN UNTUK SESI MAKEUP ANDA DI BAWAH INI:",
    land_10: "PESAN UNTUK SESI MAKEUP ANDA DI BAWAH INI:",
    land_11: "PESAN UNTUK SESI MAKEUP ANDA DI BAWAH INI:",
    land_12: "PESAN UNTUK SESI MAKEUP ANDA DI BAWAH INI:",
    land_13: "pranikah (300k)",
    land_14: "pertunangan (250k)",
    land_15: "wisuda (200k)",
    land_16: "pemotretan (200k)",
    land_17: "pesta (200k)",
    land_18: "pertemuan (200k)",
    land_19: "tanggal (200k)",
    land_20: "DIMANA ANDA INGIN MEMULAI SESI MAKEUP?",
    land_21: "tempat kita",
    land_22: "tempatmu",
    land_23: "ALAMAT ANDA",
    land_24: "HARGA AKAN DITAMBAHKAN UANG TAMBAHAN (BISA NEGO)",
    land_25: "PILIH HARI UNTUK SESI MAKEUP ANDA?",
    land_26: "PILIH WAKTU UNTUK SESI MAKEUP ANDA?",
    land_27: "PESAN SEKARANG",
    land_28: "KAMI AKAN MENGHUBUNGI ANDA UNTUK SESI MAKEUP ANDA PADA TANGGAL YANG ANDA PILIH",
    land_29: "PASTIKAN ANDA MEMBERIKAN NOMOR TELEPON YANG BENAR",
    land_30: "SESI MAKEUP YANG ANDA PESAN",
    land_31: "SESI MAKEUP YANG DIPESAN DITEMUKAN UNTUK ANDA!",
    land_32: "KESEMPATAN SESI MAKEUP:",
    land_33: "TANGGAL SESI MAKEUP :",
    land_34: "WAKTU SESI MAKEUP :",
    land_35: "TEMPAT SESI MAKEUP :",
  }
}

// load the select images
document.querySelector("#country-select").addEventListener("change", (e) => {
  setLanguage(e.target.value)
  localStorage.setItem("makeup4unique-lang", e.target.value)
})

const setLanguage = (language) => {
  document.querySelectorAll("[data-lang]").forEach(element => {
    const translationKey = element.getAttribute("data-lang")

    if (element.getAttribute('id') === "food_qty") {
      element.placeholder = translations[language][translationKey]
    } else {
      element.innerText = translations[language][translationKey]
    }
  })
}

const langParams = localStorage.getItem("makeup4unique-lang") || "en"
setLanguage(langParams)


function getSessions() {
  let URL = document.URL.split("#")[0];
  var id = new DeviceUUID().get();
  axios.get(URL + `api/v1/auth/get_sessions/${id}`).then(res => {
    const sessions = res.data.sessions;
    localStorage.setItem("makeup4unique_sessions", JSON.stringify(sessions))
    if (!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }).catch(err => {
    console.log(err);

  })
}

function makeSession(name, phone, occasion, place, date, time, address) {
  let URL = document.URL.split("#")[0];
  var uid = new DeviceUUID().get();
  axios.post(URL + `api/v1/auth/book_session`, { name, phone, occasion, place, date, time, address, device_uid: uid }).then(res => {
    const myPopup = new Popup({
      id: "my-popup",
      title: "MAKEUP4UNIQUE",
      content: `${localStorage.getItem("lang") === "in" ? `
      KAMI MEMESAN SESI MAKEUP ANDA DENGAN SUKSES!` : "WE BOOKED YOUR MAKEUP SESSION SUCCESSFULLY!"}`,
      showImmediately: true,
      textColor: "green"
    });



    // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
    myPopup.show();
    document.querySelector("#book_session").disabled = true

    setTimeout(() => {
      window.location.reload()
    }, 3000)

  }).catch(err => {

    const msg = err.response.data.msg;

    if (msg.includes("WE HAVE A SESSION AT THIS TIME , PLEASE CHOOSE ANOTHER TIME")) {
      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `
        KAMI PUNYA SESI SAAT INI, SILAHKAN PILIH WAKTU LAIN (4 jam lebih lambat dari waktu ini) DI HARI INI ATAU PILIH HARI LAIN` : "WE HAVE A SESSION AT THIS TIME , PLEASE CHOOSE ANOTHER TIME (4 hours later from this time) IN THIS DAY OR CHOOSE ANOTHER DAY"}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();
    } else if (msg.includes("THIS DAY IS COMPLETE PLEASE BOOKE A SESSION IN ANOTHER DAY")) {
      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `
        HARI INI SUDAH SELESAI, HARAP PESAN SESI DI HARI LAIN` : "THIS DAY IS COMPLETE PLEASE BOOKE A SESSION IN ANOTHER DAY"}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();
    }else if(msg.includes("WE ARE WORKING ON A MAKEUP SESSION FOR THIS TIME")){
      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `
        KAMI BEKERJA DALAM SESI MAKEUP UNTUK WAKTU INI, ANDA DAPAT MENENTUKAN WAKTU 4 JAM DARI SEKARANG ATAU ANDA DAPAT MEMESAN UNTUK HARI LAIN!` : `WE ARE WORKING ON A MAKEUP SESSION FOR THIS TIME ,  YOU CAN SPECIFY A TIME 4 HOURSE FROM NOW OR YOU CAN BOOK FOR ANOTHER DAY!`}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();
    }

    else {

      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `
      ADA YANG SALAH COBA LAGI KEMUDIAN!` : "SOMETHING WENT WRONG TRY AGAIN LATER!"}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();

    }

  })


}



document.querySelector("#book_session").addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  let occasion = document.querySelector("#occasion").value;
  let place = document.querySelector("#place").value;
  let address = document.querySelector("#place").value === "your place" ? document.querySelector("#address").value : "";
  let date = document.querySelector("#date").value;
  var [h, m] = document.getElementById('time').value.split(":");
  let time = h >= 12 ? document.getElementById('time').value + ' PM' : document.getElementById('time').value + ' AM'

  let phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/;

  const check = () => {
    let status;
    if (document.querySelector("#place").value === "your place" && address) {
      status = true;
    } else {
      status = false
    };

    return status;
  }

  if (place === "our place") {

    if (name && phone && occasion && place && date && time) {

      if (!phoneRegex.test(phone)) {
        // Phone number is valid
        const myPopup = new Popup({
          id: "my-popup",
          title: "MAKEUP4UNIQUE",
          content: `${localStorage.getItem("lang") === "in" ? `HARAP MASUKKAN NOMOR YANG VALID (CONTOH:+62212341234)
        ` : "PLEASE ENTER A VALID NUMBER (EX:+62212341234)"}`,
          showImmediately: true,
          textColor: "red"
        });



        // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
        myPopup.show();
        document.querySelector("#phone").value = ""
      } else {
        // do logic
        makeSession(name, phone, occasion, place, date, time, address = "")
      }





    } else {
      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `MOHON CANTUMKAN NAMA, TELEPON, KEJADIAN, TEMPAT, TANGGAL, WAKTU
      ` : "PLEASE PROVIDE NAME , PHONE , OCCASION , PLACE , DATE , TIME"}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();
    }
  } else {
    if (name && phone && occasion && place && date && time && address) {

      if (!phoneRegex.test(phone)) {
        // Phone number is valid
        const myPopup = new Popup({
          id: "my-popup",
          title: "MAKEUP4UNIQUE",
          content: `${localStorage.getItem("lang") === "in" ? `HARAP MASUKKAN NOMOR YANG VALID (CONTOH:+62212341234)
        ` : "PLEASE ENTER A VALID NUMBER (EX:+62212341234)"}`,
          showImmediately: true,
          textColor: "red"
        });



        // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
        myPopup.show();
        document.querySelector("#phone").value = ""
      } else {
        // do logic
        makeSession(name, phone, occasion, place, date, time, address)
      }





    } else {
      const myPopup = new Popup({
        id: "my-popup",
        title: "MAKEUP4UNIQUE",
        content: `${localStorage.getItem("lang") === "in" ? `MOHON CANTUMKAN NAMA, TELEPON, KEJADIAN, TEMPAT, TANGGAL, WAKTU , ALAMAT
      ` : "PLEASE PROVIDE NAME , PHONE , OCCASION , PLACE , DATE , TIME , ADDRESS"}`,
        showImmediately: true,
        textColor: "red"
      });



      // document.querySelector(".error").innerText = `Please Provide Your Missing Order Details!!`;
      myPopup.show();
    }
  }

})


// async function ip_local() {

//   var navigator_info = window.navigator;
//   var screen_info = window.screen;
//   var uid = navigator_info.mimeTypes.length;
//   uid += navigator_info.userAgent.replace(/\D+/g, '');
//   uid += navigator_info.plugins.length;
//   uid += screen_info.height || '';
//   uid += screen_info.width || '';
//   uid += screen_info.pixelDepth || '';


//   // localIp
//   let url = document.URL.split("#")[0];

//   url = url.split("landing")[0];

//   axios.get(url + `api/v1/auth/localIp/${uid}`).then(res => console.log(res)).catch(err => console.log(err))


//   return uid;

// }


// // /api/v1/auth
// async function createUser(fullname, email, password) {

//   let url = document.URL.split("#")[0];

//   url = url.split("landing")[0];

//   // const api = await fetch('https://api.ipify.org?format=json')

//   // const api_res = await api.json();
//   // var uuid = new DeviceUUID().get();
//   // const ip = new DeviceUUID().get();
//   const ip = await ip_local();

//   // console.log(ip);


//   axios.post(url + "api/v1/auth/signup", { fullname, email, password, ip_address: ip }).then(res => {

//     let msg = res.data.msg;
//     let token = res.data.token;
//     let user = res.data.user;

//     let userObj = {
//       user: user,
//       token: token
//     }

//     localStorage.setItem("user", JSON.stringify(userObj));

//     document.querySelector("#auto_create_account").disabled = true;

//     let HTML = msg.includes("User Logged In Successfully") ? `<p class="success-message">${localStorage.getItem("lang") === "in" ? "Pengguna Berhasil Masuk" : msg}</p>` : `<p class="success-message">${localStorage.getItem("lang") === "in" ? "AKUN ANDA TELAH DIBUAT DENGAN SUKSES" : msg}</p>`;

//     document.querySelector("#success").innerHTML += HTML;

//     setTimeout(() => {
//       document.querySelector("#success").innerHTML = "";
//       document.querySelector("#auto_create_account").disabled = false;

//       window.location.href = "/home";

//     }, 3000)



//   }).catch(err => {
//     console.log(err);

//   });





// }


// document.querySelector("#auto_create_account").addEventListener("click", (e) => {
//   createUser("auto", "auto", "auto")
// })
