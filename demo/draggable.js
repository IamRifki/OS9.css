let x, y, target = null;

document.addEventListener('mousedown', function(e) {
  let clickedDragger = false;
  for(let i = 0; e.path[i] !== document.body; i++) {
    if (e.path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (clickedDragger && e.path[i].classList.contains('draggable')) {
      target = e.path[i];
      target.classList.add('dragging');
      x = e.clientX - target.style.left.slice(0, -2);
      y = e.clientY - target.style.top.slice(0, -2);
      return;
    }
  }
});

document.addEventListener('mouseup', function() {
  if (target !== null) target.classList.remove('dragging');
  target = null;
});

document.addEventListener('mousemove', function(e) {
  if (target === null) return;
  target.style.left = e.clientX - x + 'px';
  target.style.top = e.clientY - y + 'px';
  let pRect = target.parentElement.getBoundingClientRect();
  let tgtRect = target.getBoundingClientRect();

  if (tgtRect.left < pRect.left) target.style.left = 0;
  if (tgtRect.top < pRect.top) target.style.top = 0;
  if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
  if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
});
