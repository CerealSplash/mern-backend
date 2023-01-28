import cloudinary from "cloudinary";


//Mis datos de cloudinary
cloudinary.config({ 
    cloud_name: 'dpnnobw2e', 
    api_key: '257732954179633', 
    api_secret: 'SyF1Bnlux1WhyfpKcohB9VAPVIw' 
});

//Este es el método de cloudinary que nos permite subir archivos a nuestra nube en el servicio mismo de cloudinary recibiendo como parametros el nombre del archivo
//Como segundo parametro recibe un objeto donde lleva el folder (Nombre de la carpeta en la nube donde se almacenará la imagén)

export const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "img-tasks-app"
  });
};

//El sig. método elimina la imagen de cloudinary pasandole un id único que se le asigna mediante cloudinary
export const deleteImage = async (id)=>{
    return await cloudinary.v2.uploader.destroy(id)
}