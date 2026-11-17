import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, ScrollView } from 'react-native';

export default function App() {
  const [vendedor, setVendedor] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('false');
  const [mensaje, setMensaje] = useState('Ingrese los datos del producto');
  const [listaProductos, setListaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');


const agregarProducto = () => {
  if (!vendedor.trim()) {
    setMensaje('Ingrese el nombre del vendedor ')
    return;
  }
  
  if (!producto.trim()) {
    setMensaje('Ingrese el producto a vender ')
    return;
  }
  if (!categoria.trim()) {
    setMensaje('Por favor, ingrese la categoría');
    return;
    }
  if (!precio.trim()) {
    setMensaje('Ingrese el precio del producto ')
    return;
  }
  if (!descripcion.trim()) {
    setMensaje('Ingrese la descripcion del producto ')
    return;
  }
  if (!stock.trim()) {
    setMensaje('Ingrese la cantidad de productos a vender ')
    return;
  }

  const nuevoProducto = {
    vendedor,
    producto,
    categoria,
    precio,
    descripcion,
    stock,
    disponibilidad,
  };
  setListaProductos([...listaProductos, nuevoProducto]);
  setMensaje('Producto agregado con éxito');
    
  setProducto('');
  setCategoria('');
  setPrecio('');
  setDescripcion('');
  setStock('');
  setDisponibilidad(false);
}
};
  const eliminarUnProducto = (index) => {
    if (!listaProductos[index].disponibilidad) {
      setMensaje('Solo se pueden eliminar productos no disponibles');
      return;
    }

    setListaProductos(listaProductos.filter((_, i) => i !== index));
    setMensaje('Producto eliminado correctamente');
  };
  const buscadorProductos = listaProductos.filter((item) =>
  item.producto.toLowerCase().includes(busqueda.toLowerCase())
);
  