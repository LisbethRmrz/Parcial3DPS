import React, { useEffect, useState } from "react";
import EmpleadoForm from "./EmpleadoForm";

import { firestore } from "../../firebase";
import { toast } from "react-toastify";

const Empleados = () => {
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  //const getEmpleados = async () => {
    //firestore.collection("Empleados").onSnapshot((querySnapshot) => {
      //const docs = [];
      //querySnapshot.forEach((doc) => {
        //docs.push({ ...doc.data(), id: doc.id });
      //});
      //setEmpleados(docs);
    //});
  //};

  const getEmpleados = async () => {
    firestore.collection("Empleados").orderBy("sueldoLiquido", "desc").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        setEmpleados(docs);
    });
};

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("are you sure you want to delete this Empleado?")) {
      await firestore.collection("Empleados").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  /*const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === "") {
        await firestore.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await firestore.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  }; */

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
        let sueldoLiquido = 0;
        let sueldoBase = 0;
        let val1 = 0;
        let isssDesc = 0;
        let afpDesc = 0;
        let rentaDesc = 0;
        const isss = 0.0525;
        const afp = 0.0688;
        const renta = 0.1;

        if (currentId === "") {
            // calculando sueldo base
            if (EmpleadoObject.horas <= 160) {
                sueldoBase = EmpleadoObject.horas * 9.75;
            }
            if (EmpleadoObject.horas > 160 && EmpleadoObject.horas <= 200) {
                val1 = EmpleadoObject.horas - 160;
                sueldoBase = (160 * 9.75) + (val1 * 11.50);
            }
            if (EmpleadoObject.horas > 200 && EmpleadoObject.horas <= 250) {
                val1 = EmpleadoObject.horas - 200;
                sueldoBase = (160 * 9.75) + (40 * 11.50) + (val1 * 12.50);
            }

            //calculando descuentos
            isssDesc = sueldoBase * isss;
            afpDesc = sueldoBase * afp;
            rentaDesc = sueldoBase * renta;

            // calculando sueldo liquido
            sueldoLiquido = sueldoBase - isssDesc - afpDesc - rentaDesc;

            //asignacion
            EmpleadoObject.sueldoBase = Math.round(sueldoBase * 100) / 100;
            EmpleadoObject.sueldoLiquido = Math.round(sueldoLiquido * 100) / 100;
            EmpleadoObject.isssDesc = Math.round(isssDesc * 100) / 100;
            EmpleadoObject.afpDesc = Math.round(afpDesc * 100) / 100;
            EmpleadoObject.rentaDesc = Math.round(rentaDesc * 100) / 100;

            await firestore.collection("Empleados").doc().set(EmpleadoObject);
            toast("Se agrego un Empleado", {
                type: "success",
            });

        } else {
            // calculando nuevo sueldo base
            if (EmpleadoObject.horas <= 160) {
                sueldoBase = EmpleadoObject.horas * 9.75;
            }
            if (EmpleadoObject.horas > 160 && EmpleadoObject.horas <= 200) {
                val1 = EmpleadoObject.horas - 160;
                sueldoBase = (160 * 9.75) + (val1 * 11.50);
            }
            if (EmpleadoObject.horas > 200 && EmpleadoObject.horas <= 250) {
                val1 = EmpleadoObject.horas - 200;
                sueldoBase = (160 * 9.75) + (40 * 11.50) + (val1 * 12.50);
            }

            //calculando nuevos descuentos
            isssDesc = sueldoBase * isss;
            afpDesc = sueldoBase * afp;
            rentaDesc = sueldoBase * renta;

            // calculando nuevo sueldo liquido
            sueldoLiquido = sueldoBase - isssDesc - afpDesc - rentaDesc;

            // nueva asignacion
            EmpleadoObject.sueldoBase = Math.round(sueldoBase * 100) / 100;
            EmpleadoObject.sueldoLiquido = Math.round(sueldoLiquido * 100) / 100;
            EmpleadoObject.isssDesc = Math.round(isssDesc * 100) / 100;
            EmpleadoObject.afpDesc = Math.round(afpDesc * 100) / 100;
            EmpleadoObject.rentaDesc = Math.round(rentaDesc * 100) / 100;

            await firestore.collection("Empleados").doc(currentId).update(EmpleadoObject);
            toast("Se actualizo un Empleado", {
                type: "info",
            });
            setCurrentId("");
        }
    } catch (error) {
        console.error(error);
    }
};


  return (
    <>    
      <div className="col-md-4 p-2">
        <h2>Agregar Empleados</h2>
        <EmpleadoForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista de Empleados</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Horas</th>
                <th>Sueldo Base</th>
                <th>ISSS</th>
                <th>AFP</th>
                <th>RENTA</th>
                <th>Sueldo Liquido</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.codigo}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horas}</td>
                  <td>{Empleado.sueldoBase}</td>
                  <td>{Empleado.isssDesc}</td>
                  <td>{Empleado.afpDesc}</td>
                  <td>{Empleado.rentaDesc}</td>
                  <td>{Empleado.sueldoLiquido}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Empleados;