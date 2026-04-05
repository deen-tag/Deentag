document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.icon-card');
  cards.forEach((card, i) => {
    card.draggable = true;
    card.style.position = 'absolute';
    card.style.cursor = 'grab';
    const positions = [
      '20px,20px', '20px,160px', '140px,20px', 
      '140px,100px', '140px,160px', '270px,20px', 
      '270px,100px', '270px,160px', '400px,80px'
    ];
    const [top, left] = positions[i].split(',');
    card.style.top = top;
    card.style.left = left;
  });
  
  let dragged = null;
  document.addEventListener('dragstart', e => dragged = e.target);
  document.addEventListener('dragend', () => dragged = null);
  document.querySelector('.icons-grid').addEventListener('dragover', e => e.preventDefault());
  document.querySelector('.icons-grid').addEventListener('drop', e => {
    if(dragged) {
      dragged.style.left = (e.clientX-45)+'px';
      dragged.style.top = (e.clientY-45)+'px';
    }
  });
});
