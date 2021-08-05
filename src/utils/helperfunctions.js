import firebase from "../backend";
import { v4 as uuid_v4 } from "uuid";
const updateProfile = async (
  firstName,
  lastName,
  username,
  email,
  status,
  gender,
  phoneNumber,
  bestFriend,
  birthday,
  bio,
  image,
  currentUser
) => {
  const { id } = currentUser;
  if (image === null) {
    await firebase.auth.currentUser
      .updateProfile({
        displayName: username?.trim()?.toLowerCase(),
        photoURL: image,
        phoneNumber: phoneNumber,
        email: email,
      })
      .then(() => {
        firebase.db
          .collection("users")
          .doc(id)
          .update({
            status: status,
            firstName: firstName?.trim()?.toLowerCase(),
            lastName: lastName?.trim()?.toLowerCase(),
            email: email?.trim()?.toLowerCase(),
            gender: gender,
            birthday: birthday,
            phoneNumber: phoneNumber?.trim()?.toLowerCase(),
            bio: bio,
            displayName: username?.trim()?.toLowerCase(),
            bestFriend: bestFriend?.trim()?.toLowerCase(),
            photoURL: image,
          })
          .then(() => {
            return {
              status: 201,
            };
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => {
        return error;
      });
    return;
  }
  if (String(image).startsWith("http") === true) {
    await firebase.auth.currentUser
      .updateProfile({
        displayName: username?.trim()?.toLowerCase(),
        photoURL: image,
        phoneNumber: phoneNumber,
        email: email,
      })
      .then(() => {
        firebase.db
          .collection("users")
          .doc(id)
          .update({
            status: status,
            firstName: firstName?.trim()?.toLowerCase(),
            lastName: lastName?.trim()?.toLowerCase(),
            email: email?.trim()?.toLowerCase(),
            gender: gender,
            birthday: birthday,
            phoneNumber: phoneNumber?.trim()?.toLowerCase(),
            bio: bio,
            displayName: username?.trim()?.toLowerCase(),
            bestFriend: bestFriend?.trim()?.toLowerCase(),
            photoURL: image,
          })
          .then(() => {
            return {
              status: 201,
            };
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => {
        return error;
      });
    return;
  } else {
    // upload image to the storage

    const childName = `${username?.trim().toLowerCase()}_${uuid_v4()}`;
    const uploadTask = firebase.storage
      .ref(`profiles/${childName}`)
      .putString(image, "data_url");
    uploadTask.on(
      "state_changed",
      (obs) => {
        // Ingnore the observer
      },
      (error) => {
        console.error(error);
      },
      () => {
        firebase.storage
          .ref("profiles")
          .child(childName)
          .getDownloadURL()
          .then((url) => {
            firebase.auth.currentUser
              .updateProfile({
                displayName: username?.trim()?.toLowerCase(),
                photoURL: url,
                phoneNumber: phoneNumber,
                email: email,
              })
              .then(() => {
                firebase.db.collection("users").doc(id).update({
                  status: status,
                  firstName: firstName?.trim()?.toLowerCase(),
                  lastName: lastName?.trim()?.toLowerCase(),
                  email: email?.trim()?.toLowerCase(),
                  gender: gender,
                  birthday: birthday,
                  phoneNumber: phoneNumber?.trim()?.toLowerCase(),
                  bio: bio,
                  displayName: username?.trim()?.toLowerCase(),
                  bestFriend: bestFriend?.trim()?.toLowerCase(),
                  photoURL: url,
                });
              })
              .then(() => {
                firebase.db.collection("profiles").add({
                  profile: url,
                  timestamp: firebase.timestamp,
                  displayName: currentUser?.displayName,
                  email: currentUser?.email,
                  userId: currentUser?.id,
                });
              });
          })
          .then(() => {
            return {
              status: 201,
            };
          })
          .catch((error) => console.error(error));
      }
    );
  }
};

const postSize = async (url) => {
  const { size } = await firebase.storage.refFromURL(url).getMetadata();
  if (size) {
    const kb = size / 1024; // bytes
    const mb = kb / 1024;
    const gb = mb / 1024;
    if (Math.round(gb) > 0) {
      return gb.toFixed(2) + " gb";
    }
    if (Math.round(mb) > 0) {
      return mb.toFixed(2) + " mb";
    }
    return kb.toFixed(2) + " kb";
  }
  // return size;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const getMonthAndYear = (timestamp) => {
  const dateObject = new Date(timestamp?.toDate());
  return `${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
};
const timeString = (timestampObject, timestamp) => {
  if (!timestampObject && !timestamp) {
    return;
  }
  const { days, hours, minutes, seconds } = timestampObject;
  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        if (seconds === 0) {
          return "now";
        } else {
          return `${seconds} sec ago`;
        }
      } else {
        return `${minutes} min ago`;
      }
    } else {
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
    }
  } else if (days >= 7) {
    const weekCount = Math.floor(days / 7);
    return `${weekCount} ${weekCount === 1 ? "wk" : "wks"} ago`;
  } else if (days > 30) {
    return getMonthAndYear(timestamp);
  } else {
    return `${days} ${days === 1 ? "d" : "days"} ago`;
  }
};

const calcDays = (numberOfDays) => Number.parseInt(numberOfDays);
const calcHours = (numberHours) => Number.parseInt(numberHours);
const calcMinutes = (numberOfMinutes) => Number.parseInt(numberOfMinutes);
const calcSeconds = (numberOfSeconds) => Number.parseInt(numberOfSeconds);
const timestampToTime = (timestamp) => {
  if (!timestamp) {
    return;
  }
  const timestampSeconds = timestamp?.seconds * 1000;
  const numberOfDays =
    (new Date().getTime() - new Date(timestampSeconds).getTime()) /
    (60 * 60 * 1000 * 24);
  const numberOfHours =
    (new Date().getTime() - new Date(timestampSeconds).getTime()) /
    (60 * 60 * 1000);
  const numberOfMinutes =
    (new Date().getTime() - new Date(timestampSeconds).getTime()) / (1000 * 60);
  const numberOfSeconds =
    (new Date().getTime() - new Date(timestampSeconds).getTime()) / 1000;
  return {
    days: calcDays(numberOfDays),
    hours: calcHours(numberOfHours) - 24 * calcDays(numberOfDays),
    minutes: calcMinutes(numberOfMinutes) - 60 * calcHours(numberOfHours),
    seconds: calcSeconds(numberOfSeconds) - 60 * calcMinutes(numberOfMinutes),
  };
};

const findHashTags = (caption) => {
  const exp = new RegExp(/#[a-zA-Z0-9]+/gim);
  return caption.match(exp);
};

const findMentions = (caption) => {
  const exp = new RegExp(/@[a-zA-Z0-9]+/gim);
  return caption.match(exp);
};

const addHashTag = (tags) => {
  tags = tags ? tags.map((tag) => tag.toLowerCase()) : [];
  firebase.db
    .collection("hashtags")
    .get()
    .then((hashTags) => {
      const databaseTags = tags.filter(
        (__tag) => hashTags.docs.map((_tag) => _tag.id).indexOf(__tag) === -1
      );
      databaseTags.forEach((tag) => {
        firebase.db.collection("hashtags").doc(tag).set({
          hashtag: tag,
          timeCreated: firebase.timestamp,
        });
      });
    });
};
const mentionPeople = (mentions) => {
  const mentioned = firebase.db.collection("users");
};

const refetchPostsHashtags = () => {
  const hashtags = firebase.db
    .collection("hashtags")
    .get()
    .then((hashtags) =>
      hashtags.docs.map((doc) => ({ id: doc?.id, ...doc.data() }))
    );
  const posts = firebase.db
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get()
    .then((posts) => posts.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return [posts, hashtags];
};

const deletePost = (postsURL, collectionName, post) => {
  // DELETE A POST FROM A DATABASE AS WELL AS STORAGE
  firebase.db
    .collection(collectionName)
    .doc(post?.id)
    .delete()
    .then(() => firebase.storage.refFromURL(postsURL).delete());
};

const numberFormat = (value) => {
  if (value >= 1e9) {
    const fractionPart = `${(value / 1e9).toFixed(1)}`.split(".")[1];
    if (Number(fractionPart) > 0) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else {
      return `${(value / 1e9).toFixed(0)}B`;
    }
  }
  if (value >= 1e6) {
    const fractionPart = `${(value / 1e6).toFixed(1)}`.split(".")[1];
    if (Number(fractionPart) > 0) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else {
      return `${(value / 1e6).toFixed(0)}M`;
    }
  }
  if (value >= 1e3) {
    const fractionPart = `${(value / 1e3).toFixed(1)}`.split(".")[1];
    if (Number(fractionPart) > 0) {
      return `${(value / 1e3).toFixed(1)}K`;
    } else {
      return `${(value / 1e3).toFixed(0)}K`;
    }
  } else {
    return `${Number(value)}`;
  }
};

const notifyToWhomItMayConcern = (
  currentUser,
  message,
  post,
  anotherUser,
  type
) => {
  if (post !== null) {
    firebase.db
      .collection("users")
      .doc(post?.userId)
      .collection("notifications")
      .add({
        email: currentUser?.email,
        photoURL: currentUser?.photoURL,
        displayName: currentUser?.displayName,
        timestamp: firebase.timestamp,
        userId: currentUser?.uid,
        message: `${currentUser?.displayName} ${message}`,
        postUrl: post?.imageURL,
        caption: post?.caption,
        postId: post?.id,
        userVerified: currentUser?.userVerified ? true : false,
        type: type,
        viewed: false,
      });
  } else {
    firebase.db
      .collection("users")
      .doc(anotherUser?.id)
      .collection("notifications")
      .add({
        email: currentUser?.email,
        photoURL: currentUser?.photoURL,
        displayName: currentUser?.displayName,
        timestamp: firebase.timestamp,
        userId: currentUser?.uid,
        message: `${currentUser?.displayName} ${message}`,
        userVerified: currentUser?.userVerified ? true : false,
        type: type,
        viewed: false,
      });
  }
};

const helperFunctions = {
  findHashTags,
  findMentions,
  addHashTag,
  refetchPostsHashtags,
  timestampToTime,
  timeString,
  deletePost,
  postSize,
  updateProfile,
  numberFormat,
  notifyToWhomItMayConcern,
};
export default helperFunctions;
