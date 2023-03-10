import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
galleryRef.innerHTML = createGalleryItems(galleryItems);

galleryRef.addEventListener('click', onClickOpenBigImage);

function onClickOpenBigImage(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    const minificatedImageURL = event.target.src;
    const fullImageURL = event.target.dataset.source;
    const textInnerHTML = event.target.outerHTML.replace(
      `src="${minificatedImageURL}"`,
      `src="${fullImageURL}"`
    );

    const instance = basicLightbox.create(textInnerHTML, {
      onShow: function () {
        document.addEventListener('keydown', setKeyEscapeListener);
      },
      onClose: function () {
        document.removeEventListener('keydown', setKeyEscapeListener);
      },
    });

    instance.show();

    function setKeyEscapeListener(e) {
      if (e.code === 'Escape') {
        instance.close();
      }
    }
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
