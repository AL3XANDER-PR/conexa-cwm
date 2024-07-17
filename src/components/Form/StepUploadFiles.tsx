import FileUpload from "../../shared/FormInputs/FileUpload";

export default function StepUploadFiles() {
  
  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
        Subir la cara y el reverso de tu documento de identidad.
      </h3>
      <FileUpload name="images" />      
    </section>
  );
}
