import { useEffect, useRef, useState } from "react";
import { StepNavigation } from "./StepNavigation";
import { ButtonsNavigation } from "./ButtonsNavigation";
import StepInversion from "./Form/StepInversion";
import StepDatos from "./Form/StepDatos";
import { FormDataValues, initialValues } from "../interfaces/FormInterface";
import { FormikProvider, useFormik, useFormikContext } from "formik";
import { validationSchema } from "../schema/ValidateSchema";
import { postData } from "../services/apiService";
import StepDomicilio from "./Form/StepDomicilio";
import StepVinculacion from "./Form/StepVinculacion";
import StepOrigenFondos from "./Form/StepOrigenFondos";
import StepPPE from "./Form/StepPPE";
import StepUploadFiles from "./Form/StepUploadFiles";
import Confirmation from "../shared/Confirmation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { sendMessage } from "../services/sendMessageService";
import { TIPO_PERSONA } from "../constants/constants";
const MySwal = withReactContent(Swal);

const REGION = import.meta.env.VITE_REGION;
const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export default function Form() {
  const [step, setStep] = useState<number>(0);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [loadingSendForm, setLoadingSendForm] = useState<boolean>(false);
  const [messageLoading, setMessageLoading] = useState<string>("");

  const handleStepClick = async (newStep: any) => {
    if (newStep > step) {
      const isValid = await validationSchema[step]
        .validate(formik.values, { abortEarly: false })
        .then(() => true)
        .catch((err) => {
          const touchedFields: any = {};
          err.inner.forEach((error: any) => {
            touchedFields[error.path] = true;
          });
          formik.setTouched(touchedFields);
          formik.setErrors(
            err.inner.reduce((acc: any, curr: any) => {
              acc[curr.path] = curr.message;
              return acc;
            }, {})
          );
          return false;
        });
      if (!isValid) return;
    }
    setStep(newStep);
    scrollToTop();
  };

  const handleNext = async () => {
    const isValid = await validationSchema[step]
      .validate(formik.values, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        const touchedFields: any = {};
        err.inner.forEach((error: any) => {
          touchedFields[error.path] = true;
        });
        formik.setTouched(touchedFields);
        formik.setErrors(
          err.inner.reduce((acc: any, curr: any) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {})
        );
        return false;
      });
    if (isValid) {
      setStep(step + 1);
      scrollToTop();
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    scrollToTop();
  };

  const handleConfirm = async () => {
    const isValid = await validationSchema[step]
      .validate(formik.values, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        const touchedFields: any = {};
        err.inner.forEach((error: any) => {
          touchedFields[error.path] = true;
        });
        formik.setTouched(touchedFields);
        formik.setErrors(
          err.inner.reduce((acc: any, curr: any) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {})
        );
        return false;
      });
    if (isValid) {
      setStep(step + 1);
      setConfirm(true);
      scrollToTop();
    }
  };
  const handleConfirmCancel = () => {
    setConfirm(false);
    scrollToTop();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema[step],
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // setLoadingSendForm(true);
        const persona = {
          id_persona: 0,
          tipo_documento: values.tipoDocumento,
          nro_documento: values.nroDocumento,
          nombre: values.nombres,
          razon_social: values.razonSocial,
          apellido_paterno: values.apellidoPaterno,
          apellido_materno: values.apellidoMaterno,
          fecha_nacimiento: values.fechaNacimiento,
          email: values.email,
          // telefono: values.telefonoDomicilio,
          telefono: values.telefonoDomicilio,
          celular: values.celular.split(" ").slice(1).join(""),
          id_genero: values.id_genero || null,
        };
        const ficha_conyugue = {
          id_persona: 0,
          tipo_documento: values.tipoDocumentoConyuge,
          nro_documento: values.nroDocumentoConyuge,
          nombre: values.nombresConyuge,
          apellido_paterno: values.apellidoPaternoConyuge,
          apellido_materno: values.apellidoMaternoConyuge,
        };
        const cleanedValues = {
          ...values,
          fechaNacimiento: values.fechaNacimiento || null,
          fechaInicioOperaciones: values.fechaInicioOperaciones || null,
          estadoCivil: values.estadoCivil || null,
          antiguedad_anios: values.antiguedad_anios || null,
          situacionLaboral: values.situacionLaboral || null,
          tipo_cuenta: values.tipoCuenta || null,
          id_genero: values.id_genero || null,
          id_tipo_vinculacion: values.id_tipo_vinculacion || null,
          regimenPatrimonialConyuge: values.regimenPatrimonialConyuge || null,
          celular: values.celular.split(" ").slice(1).join(""),
          persona,
          ficha_conyugue,
          djImporte: values.djImporte.replace(/[^0-9]/g, ""),
          user_audit: "cba1d092-6f06-48a3-a4d3-715cd1734f93",
        };
        setMessageLoading("Registrando datos...");

        const response: any = await postData(
          "formulario/registrarProspecto",
          cleanedValues
        );

        const id_persona = response.data.data;

        if (response.data.status === 1) {
          setMessageLoading("Subiendo Archivos...");

          await uploadFileToS3(values.pdf, id_persona);

          const msj = `Hola ${[
            values.nombres,
            values.apellidoPaterno,
            values.apellidoMaterno,
          ].join(
            " "
          )} Hemos recibido la información correctamente. Nos pondremos en contacto contigo muy pronto para continuar con el proceso.`;

          const params = {
            phone: `51${cleanedValues.persona.celular}`,
            message: msj,
          };

          await sendMessage({ ...params });

          // setConfirm(false);
          // setStep(0);
          // formik.resetForm();
        } else {
          MySwal.fire({
            title: "Error",
            text: `${response?.data?.message}`,
            icon: "error",
            customClass: {
              popup: " text-sm",
            },
          });
        }

        // setLoadingSendForm(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return;
    },
  });

  const isParticipe = (tipoPersona: string) => {
    if (tipoPersona === TIPO_PERSONA.NATURAL) {
      return "de la Empresa";
    }
    if (tipoPersona === TIPO_PERSONA.JURIDICO) {
      return "del Participe";
    }
  };

  const steps = [
    {
      title: `Datos ${isParticipe(formik.values.tipoPersona)}`,
      description: `Datos básicos ${isParticipe(formik.values.tipoPersona)}`,
      description_larga: `Datos ${isParticipe(formik.values.tipoPersona)}`,
      component: <StepDatos />,
    },
    {
      title: "Datos para la Inversión",
      description: "Datos básicos de la Inversión",
      description_larga: "Datos Basicos para el contrato de Inversión: ",
      component: <StepInversion />,
    },
    {
      title: "Domicilio y Cuentas Bancaria",
      description: "Datos de Domicilio",
      description_larga: "Datos de domicilio y cuentas bancarias.",
      component: <StepDomicilio />,
    },
    {
      title: "Vinculación",
      description: "Vinculación con CONEXA",
      description_larga: "Vinculación con CONEXA ASSET MANAGEMENT S.A",
      component: <StepVinculacion />,
    },
    {
      title: "Origen de Fondos",
      description: "Declaración Jurada de Origen de Fondos",
      description_larga: "Declaración Jurada de Origen de Fondos.",
      component: <StepOrigenFondos />,
    },
    {
      title: "Persona Políticamente Expuesta",
      description: "Condición de Persona Políticamente Expuesta",
      description_larga:
        "Declaración Jurada Sobre la Condición de Persona Políticamente Expuesta",
      component: <StepPPE />,
    },
    {
      title: "Subida de documentos",
      description: "Subir archivos de tu documento de identidad",
      description_larga: "",
      component: <StepUploadFiles />,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (window.innerWidth <= 768) {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const uploadFileToS3 = async (file: any, id_persona: string) => {
    const uploadParams = {
      Bucket: BUCKET_NAME,
      // Key: `public/levantamiento/ficha-datos/formulario/${id_persona}/documentos/${new Date().getTime()}.pdf`,
      Key: `public/levantamiento/ficha-datos/formulario/${id_persona}/documentos/DNI.pdf`,
      Body: file,
    };
    try {
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      return { success: true, message: "File uploaded successfully" };
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  };

  return (
    <main className="w-full px-5 " ref={sectionRef}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="false">
          {!confirm ? (
            <section className="flex max-w-7xl mx-auto py-5 flex-col md:flex-row ">
              <StepNavigation
                pasos={steps}
                activeStep={step}
                handleStepClick={handleStepClick}
              />
              <div className="flex-1 pr-0 pt-0  md:py-6 pl-0 flex flex-col gap-4 ">
                {/* MENU */}
                <div className="">
                  <span className="text-xs text-gray-500 font-medium">
                    Paso {step + 1}/{steps.length}
                  </span>
                  <h2 className="text-xl font-bold text-gray-">
                    {steps[step]?.description}
                  </h2>
                  <span className="text-sm block text-gray-600 font-medium whitespace-pre-line">
                    {steps[step]?.description_larga}
                  </span>
                </div>

                {/* CONTENIDO */}
                <div className="space-y-4 flex-1">{steps[step].component}</div>

                <ButtonsNavigation
                  activeStep={step}
                  pasos={steps.length}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  handleConfirm={handleConfirm}
                />
              </div>
            </section>
          ) : (
            <section className="py-8">
              <Confirmation handleConfirmCancel={handleConfirmCancel} />
            </section>
          )}
        </form>
      </FormikProvider>
      {loadingSendForm && <Loading message={messageLoading} />}
    </main>
  );
}
