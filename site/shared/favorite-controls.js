(() => {
  'use strict';
  const store = window.AtlasFavorites;
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'application/json,.json'; input.hidden = true;
  document.body.append(input);
  let timer;
  function notify(message) {
    const toast=document.querySelector('#toast');
    toast.textContent=message;toast.classList.add('visible');
    clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('visible'),3000);
  }
  document.querySelector('#favorite-export').addEventListener('click', () => {
    const json=JSON.stringify(store.exportBackup(),null,2);
    const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='web-atlas-favorites.json';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    notify('已导出案例、巧思与素材收藏。');
  });
  document.querySelector('#favorite-import').addEventListener('click',()=>input.click());
  input.addEventListener('change',async()=>{
    const [file]=input.files;if(!file)return;
    try {
      const result=store.importBackup(await file.text());
      notify('已新增收藏：'+result.added.cases+' 个案例、'+result.added.patterns+' 个巧思、'+result.added.materials+' 个素材。');
    } catch(error) {notify(error.message);}
    input.value='';
  });
})();
