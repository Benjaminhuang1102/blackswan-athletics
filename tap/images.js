const backgroundImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?fit=crop&w=1080&h=1920&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?fit=crop&w=1080&h=1920&q=80',
  // ... Add up to 31 unique vertical images
];

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const today = new Date();
  const index = (today.getDate() + today.getMonth()) % backgroundImages.length;
  hero.style.backgroundImage = `url('${backgroundImages[index]}')`;
});
