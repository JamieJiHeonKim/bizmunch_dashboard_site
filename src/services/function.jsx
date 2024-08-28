export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

export function formatDate(dateString) {
  // Parse the date string to a Date object
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function LOGOUT(redir) {
  sessionStorage.clear();
  window.location.href = redir;
}
