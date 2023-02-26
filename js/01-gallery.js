import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
galleryRef.innerHTML = createGalleryItems(galleryItems);

galleryRef.addEventListener('click', onClickOpenBigImage);

let globalInstance;
function onClickOpenBigImage(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    const minificatedImageURL = event.target.getAttribute('src');
    event.target.setAttribute('src', event.target.dataset.source);
    const instance = basicLightbox.create(`${event.target.outerHTML}`, {
      onShow: function () {
        document.addEventListener('keydown', setKeyEscapeListener);
      },
      onClose: function () {
        document.removeEventListener('keydown', setKeyEscapeListener);
      },
    });
    globalInstance = instance;
    instance.show();
    event.target.setAttribute('src', minificatedImageURL);
  }
}

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>`;
    })
    .join('');
}

function setKeyEscapeListener(e, globalInstance) {
  if (e.code === 'Escape') {
    globalInstance.close();
  }
}
