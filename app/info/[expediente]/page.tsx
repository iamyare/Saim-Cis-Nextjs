import { getAllInfoUserByExpediente } from "../actions"
import InfoExpediente from "./info-expediente"

export default async function Expediente({
    params
}: {
    params: { expediente: string }
}) {
    const { expediente, errorExpediente } = await getAllInfoUserByExpediente({ id: params.expediente })


    if (errorExpediente) {
        return (
            <div className="grid place-content-center min-h-screen">
                <h1 className="text-2xl text-center">Error:</h1>
                <div>
                    <span>{errorExpediente.message}</span>
                </div>
            </div>
        );
    }

    if (!expediente) {
        return (
            <div className="grid place-content-center min-h-screen">
                <h1 className="text-2xl text-center">No se encontro ningun Expediente</h1>
            </div>
        );
    }


    

    return (
        <InfoExpediente expediente={expediente} /> 
    );
}

