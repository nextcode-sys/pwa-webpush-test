importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// ----- ↓　ここを書き換え -----
const firebaseConfig = {
	apiKey: "○○○○○○○○○○○○○○○○○○○○○○○",
	authDomain: "○○○○○○○○○○○.firebaseapp.com",
	projectId: "○○○○○○○○○○○",
	storageBucket: "○○○○○○○○○○○.appspot.com",
	messagingSenderId: "○○○○○○○○○○○",
	appId: "○:○○○○○○○○○○○:web:○○○○○○○○○○○○○○○○○"
};
// ----- ↑ ここまで書き換え -----

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/**
 * フォアグラウンド
 */
// messaging.onMessage((payload) => {
// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: payload.notification.icon
// 	};
// 	return self.registration.showNotification(notificationTitle, notificationOptions);
// });

/**
 * バックググラウド
 */
messaging.onBackgroundMessage((payload) => {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: payload.notification.icon
	};
	return self.registration.showNotification(notificationTitle, notificationOptions);
});