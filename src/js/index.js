const fetchDynamicData = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', './data.json', true);
  xhttp.send();

  xhttp.onload = function () {
    if (this.status === 200) {
      let user = JSON.parse(this.responseText);
      document.querySelector('.main-title').textContent = user.name;
    }
  };
};

document.addEventListener('DOMContentLoaded', fetchDynamicData);

const iconsArr = document.querySelectorAll('.icon-action');
const elementsToBeHiddenArr = document.querySelectorAll('.to_hide');

const defineEventHandlersForIcons = () => {
  if (!!iconsArr?.length) {
    iconsArr.forEach((icon, i) => {
      const elemToHideByIdx = elementsToBeHiddenArr[i];
      icon.addEventListener('click', (e) => {
        if (e.target.classList.contains("rotate-180")) {
          e.target.classList.remove("rotate-180");
          elemToHideByIdx.classList.remove("d-none");
        } else {
          e.target.classList.add("rotate-180");
          elemToHideByIdx.classList.add("d-none");
        }
      });
    });
  }
};

defineEventHandlersForIcons();
