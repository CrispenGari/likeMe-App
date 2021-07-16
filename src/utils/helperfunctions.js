import firebase from "../backend";

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
  const { days, hours, minutes, seconds } = timestampObject;
  if (days === 0) {
    if (hours == 0) {
      if (minutes == 0) {
        if (seconds == 0) {
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
  const timestampSeconds = timestamp.seconds * 1000;
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
const helperFunctions = {
  findHashTags,
  findMentions,
  addHashTag,
  refetchPostsHashtags,
  timestampToTime,
  timeString,
};
export default helperFunctions;
