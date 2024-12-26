import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Simulation } from "../../../models/Simulation.js"; // Asegúrate de importar tu clase
import './UpdateSimulationForm.css';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../context/AppSate.js";
import { GetSimulationById, UpdateSimulation } from "../../../api/simulationApi.js";
import { toast } from "react-toastify";
import { GetTreminosDePago } from "../../../api/TerminoDePagoApi.js";
import { TerminoDePago } from "../../../models/TerminoDePago.js";

const UpdateSimulationForm = () => {

    const { idSimulacion } = useParams();
    const [terminosDePago, setTerminosDePago] = useState([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const defaultValues = new Simulation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues, // Inicializa el formulario con los valores por defecto
    });

    // En el useEffect para mostrar el mensaje después de la recarga
    useEffect(() => {
        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            toast.success(successMessage); // Mostrar el mensaje en el toast
            // Limpiar el mensaje después de 3 segundos
            setTimeout(() => {
                sessionStorage.removeItem('successMessage'); // Limpiar el mensaje después de mostrarlo
            }, 3000); // 3000ms (3 segundos)
        }
    }, [])

    useEffect(() => {
        const fetchTerminosDePago = async () => {
            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const data = await GetTreminosDePago();
                // Convertir los datos obtenidos en instancias de TerminoDePago
                const terminos = data.map(
                    (item) => new TerminoDePago(item.idTerminoDePago, item.descripcion)
                );

                setTerminosDePago(terminos);
            } catch (error) {
                const errormessage = error.response?.data?.split('at')[0] || "Error desconocido";
                toast.error("Error al tratar de obtener las opciones de metodos de pago" + errormessage);
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };
        fetchTerminosDePago();
    }, [dispatch]);


    useEffect(() => {
        const fetchSimulationData = async () => {
            if (!idSimulacion && terminosDePago.length > 0) return;

            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const data = await GetSimulationById(idSimulacion);

                // Aquí es donde setearías los valores en el formulario
                setValue("idSimulacion", data.idSimulacion); // Para campos que no cambiarán y son read-only
                setValue("titulo", data.titulo);
                setValue("monto", data.monto);
                setValue("terminoPagoId", data.terminoPagoId);
                setValue("fechaInicio", data.fechaInicio);
                setValue("fechaFin", data.fechaFin);
                setValue("tasa", data.tasa * 100); // Si tasa también es un campo editable

            } catch (error) {
                let errorMessage = "";
                try {
                    errorMessage = error.response?.data?.split('at')[0];
                } catch (error) {
                    errorMessage = "Error desconocido"
                } finally {
                    toast.error("Error al tratar de obtener la informacion de la simulacion con id: " + idSimulacion + ", " + errorMessage);
                }
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };

        fetchSimulationData();
    }, [idSimulacion, dispatch, setValue, terminosDePago]);


    // Función para manejar la acción de volver atrás
    const handleGoBack = () => {
        navigate(-1);  // -1 retrocede una página en la historia de navegación
    };



    const onSubmit = async (data) => {

        dispatch({ type: "SET_LOADING", payload: true });
        try {
            await UpdateSimulation(data);
            // Almacenar el mensaje en sessionStorage
            sessionStorage.setItem('successMessage', 'Tasa recalculada con éxito');
            navigate(0);
        } catch (error) {

            let errorMessage = "";
            try {
                errorMessage = error.response?.data?.split('at')[0];
            } catch (error) {
                errorMessage = "Error desconocido"
            } finally {
                toast.error("Error al tratar de recalcular la tasa: " + errorMessage);
            }

        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        };
    }


    return (
        <div className="update-simulation-form-container">
            {/* Botón para volver */}
            <button
                className="btn btn btn-secondary back-button"
                onClick={handleGoBack}
            >
                <i className="bi bi-arrow-left"></i> Volver
            </button>

            {/* Formulario */}
            <form className="p-4 border rounded" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {/* ID Simulación */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="idSimulacion" className="form-label">
                            ID Simulación
                        </label>
                        <input
                            type="text"
                            id="idSimulacion"
                            className="form-control"
                            disabled
                            {...register("idSimulacion")}
                        />
                    </div>

                    {/* Título */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="titulo" className="form-label">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            className="form-control"
                            {...register("titulo", {})}
                        />
                        {errors.titulo && (
                            <small className="text-danger">{errors.titulo.message}</small>
                        )}
                    </div>

                    {/* Monto */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="monto" className="form-label">
                            Monto <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            id="monto"
                            className="form-control"
                            {...register("monto", {
                                required: "El monto es obligatorio",
                                valueAsNumber: true,
                                validate: (value) =>
                                    value > 0 || "El monto debe ser un número positivo",
                            })}
                        />
                        {errors.monto && (
                            <small className="text-danger">{errors.monto.message}</small>
                        )}
                    </div>

                    {/* Término de pago */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="terminoPagoId" className="form-label">
                            Término de Pago <span className="text-danger">*</span>
                        </label>
                        <select
                            id="terminoPagoId"
                            className="form-select"
                            {...register("terminoPagoId", { required: "Campo obligatorio" })}
                        >
                            <option value="">Seleccione un término</option>
                            {terminosDePago.map((termino) => (
                                <option key={termino.idTerminoDePago} value={termino.idTerminoDePago}>
                                    {termino.descripcion}
                                </option>
                            ))}
                        </select>
                        {errors.terminoPagoId && (
                            <small className="text-danger">{errors.terminoPagoId.message}</small>
                        )}
                    </div>

                    {/* Fecha inicial */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="fechaInicio" className="form-label">
                            Fecha Inicial <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaInicio"
                            className="form-control"
                            {...register("fechaInicio", {
                                required: "La fecha inicial es obligatoria",
                            })}
                        />
                        {errors.fechaInicio && (
                            <small className="text-danger">{errors.fechaInicio.message}</small>
                        )}
                    </div>

                    {/* Fecha final */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="fechaFin" className="form-label">
                            Fecha Final <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaFin"
                            className="form-control"
                            {...register("fechaFin", {
                                required: "La fecha final es obligatoria",
                            })}
                        />
                        {errors.fechaFin && (
                            <small className="text-danger">{errors.fechaFin.message}</small>
                        )}
                    </div>

                    {/* Tasa */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="tasa" className="form-label">
                            Tasa
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                id="tasa"
                                className="form-control"
                                disabled
                                {...register("tasa")}
                            />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>

                {/* Botón de recalcular */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                >
                    Recalcular y Actualizar
                </button>

            </form>
        </div>
    );
};

export default UpdateSimulationForm;
