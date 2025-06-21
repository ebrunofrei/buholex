import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "863424580261-ds0rstgimqvmiess33qou1fdfh5k9dc.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

export default function DriveConnector() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(setIsSignedIn);
        });
    }

    gapi.load("client:auth2", start);
  }, []);

  const iniciarSesion = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const cerrarSesion = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const listarArchivos = async () => {
    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: "files(id, name, mimeType, webViewLink)",
    });
    setArchivos(response.result.files);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📂 Google Drive vinculado</h2>
      {isSignedIn ? (
        <>
          <button
            onClick={cerrarSesion}
            className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
          <button
            onClick={listarArchivos}
            className="mb-4 bg-blue-700 text-white px-4 py-2 rounded ml-4"
          >
            Mostrar archivos
          </button>

          <ul className="mt-4 space-y-3">
            {archivos.map((file) => (
              <li
                key={file.id}
                className="bg-gray-100 p-3 rounded flex justify-between items-center"
              >
                <span>{file.name}</span>
                <a
                  href={file.webViewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button
          onClick={iniciarSesion}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Conectar con Google Drive
        </button>
      )}
    </div>
  );
}
