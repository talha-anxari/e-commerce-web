import {
  auth,
  storage,
  db,
  signOut,
  getDoc,
  doc,
  onAuthStateChanged,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "./utils/utils.js";

const logoutBtn = document.getElementById("logout_btn");
const loginLink = document.getElementById("login_link");
const userImg = document.getElementById("user_img");
const userName = document.getElementById("user_name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const myEventsBtn = document.getElementById('my_events_btn');
const makeEvents = document.getElementById('make_events');
const eventsCardsContainer = document.getElementById("events_cards_container");

getAllEvents();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    loginLink.style.display = "none";
    userImg.style.display = "inline-block";
    logoutBtn.style.display = 'inline-block';
    myEventsBtn.style.display = 'inline-block';
    makeEvents.style.display = 'inline-block';
    getUserInfo(uid);
  } else {
    // User is signed out
    loginLink.style.display = "inline-block";
    userImg.style.display = "none";
    logoutBtn.style.display = 'none';
    myEventsBtn.style.display = 'none';
    makeEvents.style.display = 'none';
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful
      window.location.href = "/auth/login/index.html";
    })
    .catch((error) => {
      // An error happened
      console.error("Sign out error:", error);
    });
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        console.log("User ID:", doc.id);
        console.log("User Info:", doc.data());
        userImg.src = doc.data().img; // Ensure this URL is correct
        userName.textContent = doc.data().firstName; // Ensure this field exists
        email.textContent = doc.data().email;
        phone.textContent = doc.data().phone;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}


// TODO: Carousel 

async function getAllEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const eventsCardsContainer = document.getElementById('events_cards_container');
    eventsCardsContainer.innerHTML = "";
    querySnapshot.forEach((doc, index) => {
      const event = doc.data();
      const { banner, title, description, date, time, location, createByEmail } = event;

      const card = document.createElement('div');
      card.classList.add('card');
      if (index === 0) card.classList.add('active'); // Set the first card as active

      card.innerHTML = `
        <a href="#">
            <img class="card-image" src="${banner}" alt="product image" />
        </a>
        <div class="card-content">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${title}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700">${description}</p>
            <div class='date-time'>
            <p class="mb-3 font-normal text-gray-700">${date}</p>
            <p class="mb-3 font-normal text-gray-700">${time}</p>
            </div>
            <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${location}</h6>
            <p class="mb-3 font-normal text-gray-700">${createByEmail}</p>
            <button id="${doc.id}" onclick="likeEvent(this)" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center">
              ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid) ? 'Liked' : 'Like'}
              ${event?.likes?.length ? event?.likes?.length : ''}
            </button>
        </div>
      `;

      eventsCardsContainer.appendChild(card);
    });

    // Start carousel
    startCarousel();
  } catch (err) {
    alert(err);
  }
}

window.likeEvent = async function (e) {
  if (auth.currentUser) {
    e.disabled = true;
    const docRef = doc(db, "events", e.id);
    try {
      if (e.innerText.trim() === 'Liked') {
        await updateDoc(docRef, {
          likes: arrayRemove(auth.currentUser.uid),
        });
        e.innerText = 'Like';
      } else {
        await updateDoc(docRef, {
          likes: arrayUnion(auth.currentUser.uid),
        });
        e.innerText = 'Liked';

        // Show "Thanks Your Feedback" message
        const feedbackMessage = document.createElement('p');
        feedbackMessage.innerText = 'Thanks Your Feedback';
        feedbackMessage.classList.add('feedback-message');
        e.parentNode.appendChild(feedbackMessage);

        // Remove the message after 2 seconds
        setTimeout(() => {
          feedbackMessage.remove();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      e.disabled = false;
    }
  } else {
    window.location.href = "/auth/login/index.html";
  }
}

function startCarousel() {
  const cards = document.querySelectorAll('.card');
  let index = 0;

  setInterval(() => {
    cards[index].classList.remove('active');
    index = (index + 1) % cards.length;
    cards[index].classList.add('active');

    // Change background
    document.querySelector('.events-carousel-container').style.background = 
      `url(${cards[index].querySelector('.card-image').src}) no-repeat center center / cover`;
  }, 3000);
}

getAllEvents();



// Assuming you call getAllEvents somewhere in your code to load the events
// getAllEvents();



var swiper = new Swiper(".bg-slider-thumbs", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 0,
});
var swiper2 = new Swiper(".bg-slider", {
  loop: true,
  spaceBetween: 0,
  thumbs: {
    swiper: swiper,
  },
});
// Navigation bar effects on scroll
window.addEventListener("scroll", function(){
  const header = this.document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
// Resposive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () =>{
  navigation.classList.add("active");
});
closeBtn.addEventListener("click", () =>{
  navigation.classList.remove("active");
});


lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  disableScrolling: true,
});
