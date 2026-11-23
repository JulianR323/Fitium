import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
const PRODUCTOS_INICIALES = [
  {
    id: 'PROD-001',
    vendedor: 'FitStore',
    marca: 'RunFlex',
    producto: 'Tenis Deportivos',
    categoria: 'Deporte',
    precio: 150000,
    descripcion: 'Cómodos tenis ligeros ideales para running y entrenamiento.',
    stock: 10,
    disponibilidad: true,
    variantes: [
      { id: 'VAR-01', nombre: 'Talla 38', precio: 150000, stock: 4 },
      { id: 'VAR-02', nombre: 'Talla 40', precio: 155000, stock: 6 },
      { id: 'VAR-03', nombre: 'Talla 42', precio: 155000, stock: 0 },
    ],
    resenas: [{ estrellas: 5, comentario: 'Muy cómodos para correr.' }],
    preguntas: [
      {
        id: 'PREG-1',
        texto: '¿Sirven para trotar en pavimento húmedo?',
        fecha: '22/11/2026',
        estado: 'Respondida',
        respuesta:
          'Respuesta automática (Modo demostración): Sí, cuentan con suela antideslizante apta para asfalto.',
      },
      {
        id: 'PREG-2',
        texto: '¿La horma viene normal o es mejor pedir media talla más?',
        fecha: '23/11/2026',
        estado: 'Pendiente',
        respuesta: '',
      },
    ],
  },
  {
    id: 'PROD-002',
    vendedor: 'TechShop',
    marca: 'SoundMax',
    producto: 'Audífonos Bluetooth',
    categoria: 'Tecnología',
    precio: 85000,
    descripcion: 'Audífonos inalámbricos con estuche de carga y buen sonido.',
    stock: 5,
    disponibilidad: true,
    variantes: [
      { id: 'VAR-04', nombre: 'Color Negro', precio: 85000, stock: 3 },
      { id: 'VAR-05', nombre: 'Color Blanco', precio: 90000, stock: 2 },
    ],
    resenas: [{ estrellas: 4, comentario: 'Buena duración de batería.' }],
    preguntas: [
      {
        id: 'PREG-3',
        texto: '¿Cuánto dura la batería con una sola carga completa?',
        fecha: '23/11/2026',
        estado: 'Pendiente',
        respuesta: '',
      },
    ],
  },
  {
    id: 'PROD-003',
    vendedor: 'FitStore',
    marca: 'HydroPro',
    producto: 'Botella Térmica 1L',
    categoria: 'Deporte',
    precio: 42000,
    descripcion: 'Termo deportivo en acero inoxidable para bebidas frías.',
    stock: 12,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-004',
    vendedor: 'DecoHogar',
    marca: 'LuzHome',
    producto: 'Lámpara LED Escritorio',
    categoria: 'Hogar',
    precio: 65000,
    descripcion: 'Lámpara recargable con tres niveles de intensidad de luz.',
    stock: 7,
    disponibilidad: true,
    variantes: [],
    resenas: [{ estrellas: 5, comentario: 'Alumbra muy bien para estudiar.' }],
    preguntas: [],
  },
  {
    id: 'PROD-005',
    vendedor: 'Huellas',
    marca: 'PetCare',
    producto: 'Cama Acolchada Mascota',
    categoria: 'Mascotas',
    precio: 95000,
    descripcion: 'Cama suave lavable y antideslizante para perros o gatos.',
    stock: 5,
    disponibilidad: true,
    variantes: [
      { id: 'VAR-06', nombre: 'Mediana (60 cm)', precio: 95000, stock: 3 },
      { id: 'VAR-07', nombre: 'Grande (80 cm)', precio: 120000, stock: 2 },
    ],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-006',
    vendedor: 'TechShop',
    marca: 'KeyTech',
    producto: 'Teclado Mecánico',
    categoria: 'Tecnología',
    precio: 180000,
    descripcion: 'Teclado compacto retroiluminado con cable USB desmontable.',
    stock: 3,
    disponibilidad: true,
    variantes: [],
    resenas: [{ estrellas: 5, comentario: 'Excelente para programar.' }],
    preguntas: [],
  },
  {
    id: 'PROD-007',
    vendedor: 'FitStore',
    marca: 'RunFlex',
    producto: 'Tapete de Yoga',
    categoria: 'Deporte',
    precio: 58000,
    descripcion: 'Colchoneta antideslizante de alta densidad con correa.',
    stock: 8,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-008',
    vendedor: 'DecoHogar',
    marca: 'LuzHome',
    producto: 'Set Organizador Cocina',
    categoria: 'Hogar',
    precio: 72000,
    descripcion: 'Juego de 4 recipientes herméticos apilables para alimentos.',
    stock: 6,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-009',
    vendedor: 'Huellas',
    marca: 'PetCare',
    producto: 'Arnés Reflectivo Perro',
    categoria: 'Mascotas',
    precio: 38000,
    descripcion: 'Pechera ajustable transpirable para paseos nocturnos.',
    stock: 9,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-010',
    vendedor: 'TechShop',
    marca: 'KeyTech',
    producto: 'Soporte para Portátil',
    categoria: 'Tecnología',
    precio: 54000,
    descripcion: 'Base plegable ergonómica en aluminio para laptops.',
    stock: 11,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-011',
    vendedor: 'DecoHogar',
    marca: 'LuzHome',
    producto: 'Difusor Aromático',
    categoria: 'Hogar',
    precio: 89000,
    descripcion: 'Humidificador silencioso con luz ambiental y apagado auto.',
    stock: 5,
    disponibilidad: true,
    variantes: [],
    resenas: [],
    preguntas: [],
  },
  {
    id: 'PROD-012',
    vendedor: 'Huellas',
    marca: 'PetCare',
    producto: 'Comedero Automático',
    categoria: 'Mascotas',
    precio: 135000,
    descripcion: 'Dispensador programable de alimento seco para mascotas.',
    stock: 0,
    disponibilidad: false,
    variantes: [],
    resenas: [{ estrellas: 4, comentario: 'Muy útil cuando salgo de casa.' }],
    preguntas: [],
  },
];
const DIRECCIONES_INICIALES = [
  {
    id: 'DIR-01',
    alias: 'Casa Ficticia',
    municipio: 'Mosquera',
    referencia: 'Calle Ficticia 10 # 20-30, frente al parque demo',
    esPrincipal: true,
  },
  {
    id: 'DIR-02',
    alias: 'Oficina Demo',
    municipio: 'Funza',
    referencia: 'Carrera Simulada 5 # 14-22, Local 2',
    esPrincipal: false,
  },
];

export default function App() {
  const [vista, setVista] = useState('catalogo');
  const [vistaAnterior, setVistaAnterior] = useState('catalogo');
  const [mensaje, setMensaje] = useState('Bienvenido a Fitsitium');
  const [listaProductos, setListaProductos] = useState(PRODUCTOS_INICIALES);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [compararIds, setCompararIds] = useState([]);
  const [idDetalle, setIdDetalle] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [marcaFiltro, setMarcaFiltro] = useState('Todas');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [precioMinInput, setPrecioMinInput] = useState('');
  const [precioMaxInput, setPrecioMaxInput] = useState('');
  const [rangoPrecio, setRangoPrecio] = useState({ min: null, max: null });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenPrecio, setOrdenPrecio] = useState('ninguno');
  const [cuponInput, setCuponInput] = useState('');
  const [cuponActivo, setCuponActivo] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [direcciones, setDirecciones] = useState(DIRECCIONES_INICIALES);
  const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState(null);
  const [editandoDirId, setEditandoDirId] = useState(null);
  const [aliasDir, setAliasDir] = useState('');
  const [municipioDir, setMunicipioDir] = useState('');
  const [referenciaDir, setReferenciaDir] = useState('');
  const [principalDir, setPrincipalDir] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [vendedor, setVendedor] = useState('');
  const [marcaInput, setMarcaInput] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [estrellasInput, setEstrellasInput] = useState('5');
  const [comentarioInput, setComentarioInput] = useState('');
  const [preguntaInput, setPreguntaInput] = useState('');
  useEffect(() => {
    try {
      const guardado = globalThis?.localStorage?.getItem('fitsitium_datos_v3');
      if (guardado) {
        const datos = JSON.parse(guardado);
        if (Array.isArray(datos.listaProductos) && datos.listaProductos.length > 0) {
          setListaProductos(
            datos.listaProductos.map((p) => ({
              ...p,
              marca: p.marca || p.vendedor || 'Fitsitium',
              stock: Math.max(0, Number(p.stock) || 0),
              precio: Math.max(1, Number(p.precio) || 1000),
              variantes: Array.isArray(p.variantes) ? p.variantes : [],
              preguntas: Array.isArray(p.preguntas) ? p.preguntas : [],
            }))
          );
        }
        if (Array.isArray(datos.favoritos)) setFavoritos(datos.favoritos);
        if (Array.isArray(datos.carrito)) setCarrito(datos.carrito);
        if (Array.isArray(datos.historial)) setHistorial(datos.historial);
        if (Array.isArray(datos.direcciones) && datos.direcciones.length > 0) {
          setDirecciones(datos.direcciones);
        }
      }
    } catch (e) {}
  }, []);
  useEffect(() => {
    try {
      globalThis?.localStorage?.setItem(
        'fitsitium_datos_v3',
        JSON.stringify({ listaProductos, favoritos, carrito, historial, direcciones })
      );
    } catch (e) {}
  }, [listaProductos, favoritos, carrito, historial, direcciones]);
  const obtenerStockTotal = (prod) => {
    if (prod.variantes && prod.variantes.length > 0) {
      return prod.variantes.reduce((acc, v) => acc + v.stock, 0);
    }
    return prod.stock;
  };
  const abrirDetalle = (id) => {
    setVistaAnterior(vista);
    setIdDetalle(id);
    setVarianteSeleccionada(null);
    setEstrellasInput('5');
    setComentarioInput('');
    setPreguntaInput('');
    setVista('detalle');
  };
  const toggleComparar = (id) => {
    if (compararIds.includes(id)) {
      setCompararIds(compararIds.filter((item) => item !== id));
      setMensaje('Producto retirado del comparador');
    } else {
      if (compararIds.length >= 3) {
        setMensaje('Límite alcanzado: máximo 3 productos para comparar');
        return;
      }
      setCompararIds([...compararIds, id]);
      setMensaje('Agregado al comparador (' + (compararIds.length + 1) + '/3)');
    }
  };
  const categorias = ['Todas', 'Deporte', 'Tecnología', 'Hogar', 'Mascotas'];
  const marcasDisponibles = [
    'Todas',
    ...Array.from(new Set(listaProductos.map((p) => p.marca).filter(Boolean))),
  ];

  const aplicarFiltroPrecio = () => {
    const min = precioMinInput.trim() === '' ? null : Number(precioMinInput);
    const max = precioMaxInput.trim() === '' ? null : Number(precioMaxInput);

    if ((min !== null && (isNaN(min) || min < 0)) || (max !== null && (isNaN(max) || max < 0))) {
      setMensaje('Error: Ingresa valores numéricos válidos para el precio');
      return;
    }
    if (min !== null && max !== null && min > max) {
      setMensaje('Error: El precio mínimo no puede ser mayor que el máximo');
      return;
    }

    setRangoPrecio({ min, max });
    setMensaje('Rango de precio aplicado');
  };

  const restablecerFiltros = () => {
    setBusqueda('');
    setCategoriaFiltro('Todas');
    setMarcaFiltro('Todas');
    setSoloDisponibles(false);
    setPrecioMinInput('');
    setPrecioMaxInput('');
    setRangoPrecio({ min: null, max: null });
    setOrdenPrecio('ninguno');
    setMensaje('Filtros restablecidos');
  };

  const productosFiltrados = listaProductos
    .filter((item) => {
      const coincideNombre = item.producto.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCat = categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro;
      const coincideMarca = marcaFiltro === 'Todas' || item.marca === marcaFiltro;
      const stockItem = obtenerStockTotal(item);
      const coincideDisp = !soloDisponibles || (stockItem > 0 && item.disponibilidad);
      const coincideMin = rangoPrecio.min === null || item.precio >= rangoPrecio.min;
      const coincideMax = rangoPrecio.max === null || item.precio <= rangoPrecio.max;
      return (
        coincideNombre &&
        coincideCat &&
        coincideMarca &&
        coincideDisp &&
        coincideMin &&
        coincideMax
      );
    })
    .sort((a, b) => {
      if (ordenPrecio === 'menor') return a.precio - b.precio;
      if (ordenPrecio === 'mayor') return b.precio - a.precio;
      return 0;
    });
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
      setMensaje('Quitado de favoritos');
    } else {
      setFavoritos([...favoritos, id]);
      setMensaje('Guardado en favoritos');
    }
  };
  const agregarAlCarrito = (item, variante = null) => {
    const prodActual = listaProductos.find((p) => p.id === item.id);
    if (!prodActual) return;

    const tieneVariantes = prodActual.variantes && prodActual.variantes.length > 0;

    if (tieneVariantes && !variante) {
      if (vista !== 'detalle' || idDetalle !== prodActual.id) {
        abrirDetalle(prodActual.id);
      }
      setMensaje('Elige una variante (talla, color o tamaño) antes de agregar');
      return;
    }

    let stockDisponible = prodActual.stock;
    let precioFinal = prodActual.precio;
    let cartId = prodActual.id;

    if (tieneVariantes && variante) {
      const varActual = prodActual.variantes.find((v) => v.id === variante.id);
      if (!varActual || varActual.stock <= 0) {
        setMensaje('La variante seleccionada está agotada');
        return;
      }
      stockDisponible = varActual.stock;
      precioFinal = varActual.precio;
      cartId = prodActual.id + '-' + varActual.id;
    } else if (stockDisponible <= 0 || !prodActual.disponibilidad) {
      setMensaje('Este producto está agotado');
      return;
    }

    const enCarrito = carrito.find((c) => c.cartId === cartId);
    if (enCarrito) {
      if (enCarrito.cantidad + 1 > stockDisponible) {
        setMensaje('Stock insuficiente. Máximo permitido: ' + stockDisponible + ' uds.');
        return;
      }
      setCarrito(
        carrito.map((c) => (c.cartId === cartId ? { ...c, cantidad: c.cantidad + 1 } : c))
      );
    } else {
      setCarrito([
        ...carrito,
        {
          cartId,
          id: prodActual.id,
          varianteId: variante ? variante.id : null,
          varianteNombre: variante ? variante.nombre : null,
          producto: prodActual.producto,
          categoria: prodActual.categoria,
          precio: precioFinal,
          cantidad: 1,
        },
      ]);
    }

    const etiqueta = variante ? `${prodActual.producto} (${variante.nombre})` : prodActual.producto;
    setMensaje('Agregado al carrito: ' + etiqueta);
  };

  const cambiarCantidad = (cartId, cambio) => {
    const itemCarrito = carrito.find((c) => c.cartId === cartId);
    if (!itemCarrito) return;

    const prodActual = listaProductos.find((p) => p.id === itemCarrito.id);
    if (!prodActual) return;

    let stockMax = prodActual.stock;
    if (itemCarrito.varianteId && prodActual.variantes) {
      const varActual = prodActual.variantes.find((v) => v.id === itemCarrito.varianteId);
      stockMax = varActual ? varActual.stock : 0;
    }

    const nuevaCantidad = itemCarrito.cantidad + cambio;

    if (nuevaCantidad < 1) {
      setMensaje('Usa el botón Eliminar para quitar este producto');
      return;
    }
    if (nuevaCantidad > stockMax) {
      setMensaje('Stock máximo permitido: ' + stockMax + ' uds.');
      return;
    }

    setCarrito(
      carrito.map((c) => (c.cartId === cartId ? { ...c, cantidad: nuevaCantidad } : c))
    );
    setMensaje('Cantidad actualizada');
  };

  const eliminarDelCarrito = (cartId) => {
    setCarrito(carrito.filter((c) => c.cartId !== cartId));
    setMensaje('Producto eliminado del carrito');
  };
  const aplicarCupon = () => {
    if (carrito.length === 0) {
      setMensaje('Agrega productos antes de usar un cupón');
      return;
    }
    if (cuponInput.trim().toUpperCase() === 'BIENVENIDO10') {
      setCuponActivo('BIENVENIDO10');
      setMensaje('Cupón BIENVENIDO10 aplicado (10% de descuento)');
    } else {
      setMensaje('Cupón no válido. Prueba con BIENVENIDO10');
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuento = carrito.length > 0 && cuponActivo === 'BIENVENIDO10' ? Math.round(subtotal * 0.1) : 0;
  const envio = carrito.length === 0 ? 0 : subtotal < 150000 ? 8000 : 0;
  const total = carrito.length === 0 ? 0 : Math.max(0, subtotal - descuento + envio);
  const limpiarFormDireccion = () => {
    setEditandoDirId(null);
    setAliasDir('');
    setMunicipioDir('');
    setReferenciaDir('');
    setPrincipalDir(false);
  };

  const iniciarEdicionDireccion = (dir) => {
    setEditandoDirId(dir.id);
    setAliasDir(dir.alias);
    setMunicipioDir(dir.municipio);
    setReferenciaDir(dir.referencia);
    setPrincipalDir(dir.esPrincipal);
    setMensaje('Editando dirección: ' + dir.alias);
  };

  const guardarDireccion = () => {
    if (!aliasDir.trim()) {
      setMensaje('Ingresa un alias para la dirección (ej. Casa, Trabajo)');
      return;
    }
    if (!municipioDir.trim()) {
      setMensaje('Ingresa el municipio de entrega');
      return;
    }
    if (!referenciaDir.trim()) {
      setMensaje('Ingresa una referencia de entrega válida');
      return;
    }

    if (editandoDirId) {
      setDirecciones(
        direcciones.map((d) => {
          if (d.id === editandoDirId) {
            return {
              ...d,
              alias: aliasDir.trim(),
              municipio: municipioDir.trim(),
              referencia: referenciaDir.trim(),
              esPrincipal: principalDir ? true : d.esPrincipal,
            };
          }
          return principalDir ? { ...d, esPrincipal: false } : d;
        })
      );
      setMensaje('Dirección actualizada correctamente');
    } else {
      const nuevaDir = {
        id: 'DIR-' + Date.now(),
        alias: aliasDir.trim(),
        municipio: municipioDir.trim(),
        referencia: referenciaDir.trim(),
        esPrincipal: principalDir || direcciones.length === 0,
      };
      const listaActualizada = nuevaDir.esPrincipal
        ? direcciones.map((d) => ({ ...d, esPrincipal: false }))
        : [...direcciones];

      setDirecciones([...listaActualizada, nuevaDir]);
      setMensaje('Dirección "' + nuevaDir.alias + '" agregada');
    }

    limpiarFormDireccion();
  };

  const marcarDireccionPrincipal = (id) => {
    setDirecciones(
      direcciones.map((d) => ({
        ...d,
        esPrincipal: d.id === id,
      }))
    );
    setMensaje('Dirección principal actualizada');
  };
  const confirmarCompra = () => {
    if (!nombreCliente.trim()) {
      setMensaje('Falta ingresar tu nombre');
      return;
    }
    if (!telefonoCliente.trim()) {
      setMensaje('Falta ingresar tu teléfono');
      return;
    }
    const dirElegida = direcciones.find((d) => d.id === direccionSeleccionadaId);
    if (!dirElegida) {
      setMensaje('Elige una dirección de entrega antes de confirmar el pedido');
      return;
    }

    const sinStock = carrito.find((item) => {
      const prod = listaProductos.find((p) => p.id === item.id);
      if (!prod) return true;
      if (item.varianteId && prod.variantes) {
        const vari = prod.variantes.find((v) => v.id === item.varianteId);
        return !vari || vari.stock < item.cantidad;
      }
      return prod.stock < item.cantidad;
    });

    if (sinStock) {
      setMensaje('Stock insuficiente para: ' + sinStock.producto);
      return;
    }

    const nuevaLista = listaProductos.map((prod) => {
      const compradosDeEsteProd = carrito.filter((c) => c.id === prod.id);
      if (compradosDeEsteProd.length === 0) return prod;

      if (prod.variantes && prod.variantes.length > 0) {
        const nuevasVariantes = prod.variantes.map((v) => {
          const itemVar = compradosDeEsteProd.find((c) => c.varianteId === v.id);
          if (!itemVar) return v;
          return { ...v, stock: Math.max(0, v.stock - itemVar.cantidad) };
        });
        const stockTotalRestante = nuevasVariantes.reduce((acc, v) => acc + v.stock, 0);
        return {
          ...prod,
          variantes: nuevasVariantes,
          stock: stockTotalRestante,
          disponibilidad: stockTotalRestante > 0,
        };
      } else {
        const totalComprado = compradosDeEsteProd.reduce((acc, c) => acc + c.cantidad, 0);
        const nuevoStock = Math.max(0, prod.stock - totalComprado);
        return {
          ...prod,
          stock: nuevoStock,
          disponibilidad: nuevoStock > 0,
        };
      }
    });

    const nuevoPedido = {
      codigo: 'PED-' + (1001 + historial.length),
      fecha: new Date().toLocaleString(),
      cliente: {
        nombre: nombreCliente.trim(),
        telefono: telefonoCliente.trim(),
        municipio: dirElegida.municipio,
        direccion: `${dirElegida.alias}: ${dirElegida.referencia}`,
      },
      items: carrito.map((item) => ({ ...item })),
      subtotal,
      descuento,
      envio,
      total,
    };

    setListaProductos(nuevaLista);
    setHistorial([nuevoPedido, ...historial]);
    setCarrito([]);
    setCuponActivo('');
    setCuponInput('');
    setNombreCliente('');
    setTelefonoCliente('');
    setDireccionSeleccionadaId(null);
    setPedidoDetalle(nuevoPedido);
    setVista('detallePedido');
    setMensaje('¡Compra simulada confirmada! (Sin cobro real)');
  };
  const limpiarFormularioVendedor = () => {
    setEditandoId(null);
    setVendedor('');
    setMarcaInput('');
    setProducto('');
    setCategoria('');
    setPrecio('');
    setDescripcion('');
    setStock('');
    setDisponibilidad(true);
  };

  const iniciarEdicion = (item) => {
    setEditandoId(item.id);
    setVendedor(item.vendedor);
    setMarcaInput(item.marca || '');
    setProducto(item.producto);
    setCategoria(item.categoria);
    setPrecio(String(item.precio));
    setDescripcion(item.descripcion);
    setStock(String(obtenerStockTotal(item)));
    setDisponibilidad(item.disponibilidad);
    setMensaje('Editando: ' + item.producto);
  };

  const guardarProducto = () => {
    const precioNum = Number(precio);
    const stockNum = Number(stock);

    if (!vendedor.trim()) {
      setMensaje('Ingrese el nombre del vendedor');
      return;
    }
    if (!producto.trim()) {
      setMensaje('Ingrese el nombre del producto');
      return;
    }
    if (!categoria.trim()) {
      setMensaje('Ingrese la categoría');
      return;
    }
    if (!precio.trim() || isNaN(precioNum) || precioNum <= 0 || !Number.isInteger(precioNum)) {
      setMensaje('El precio debe ser un entero positivo en COP');
      return;
    }
    if (descripcion.trim().length < 15) {
      setMensaje('La descripción debe tener mínimo 15 caracteres');
      return;
    }
    if (stock.trim() === '' || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      setMensaje('El stock debe ser un entero igual o mayor a 0');
      return;
    }

    const marcaFinal = marcaInput.trim() || vendedor.trim();

    if (editandoId) {
      setListaProductos(
        listaProductos.map((item) =>
          item.id === editandoId
            ? {
                ...item,
                vendedor: vendedor.trim(),
                marca: marcaFinal,
                producto: producto.trim(),
                categoria: categoria.trim(),
                precio: precioNum,
                descripcion: descripcion.trim(),
                stock: stockNum,
                disponibilidad: stockNum > 0 ? disponibilidad : false,
              }
            : item
        )
      );
      setMensaje('Producto actualizado sin duplicar');
    } else {
      const nuevoProducto = {
        id: 'PROD-' + String(listaProductos.length + 1).padStart(3, '0'),
        vendedor: vendedor.trim(),
        marca: marcaFinal,
        producto: producto.trim(),
        categoria: categoria.trim(),
        precio: precioNum,
        descripcion: descripcion.trim(),
        stock: stockNum,
        disponibilidad: stockNum > 0 ? disponibilidad : false,
        variantes: [],
        resenas: [],
        preguntas: [],
      };
      setListaProductos([...listaProductos, nuevoProducto]);
      setMensaje('Producto agregado con ID ' + nuevoProducto.id);
    }
    limpiarFormularioVendedor();
  };

  const eliminarUnProducto = (id) => {
    const prod = listaProductos.find((p) => p.id === id);
    if (prod && prod.disponibilidad && obtenerStockTotal(prod) > 0) {
      setMensaje('Solo se pueden eliminar productos no disponibles');
      return;
    }
    setListaProductos(listaProductos.filter((p) => p.id !== id));
    setCompararIds(compararIds.filter((cId) => cId !== id));
    if (editandoId === id) limpiarFormularioVendedor();
    setMensaje('Producto eliminado correctamente');
  };
  const guardarResena = (idProd) => {
    const valor = Number(estrellasInput);
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      setMensaje('Error: La calificación debe ser un número entero entre 1 y 5');
      return;
    }

    setListaProductos(
      listaProductos.map((item) =>
        item.id === idProd
          ? {
              ...item,
              resenas: [
                ...item.resenas,
                { estrellas: valor, comentario: comentarioInput.trim() || 'Buen producto' },
              ],
            }
          : item
      )
    );
    setComentarioInput('');
    setMensaje('Valoración de ' + valor + ' estrellas guardada');
  };

  const obtenerPromedio = (resenas) => {
    if (!resenas || resenas.length === 0) return 'Sin calificaciones';
    const suma = resenas.reduce((acc, r) => acc + r.estrellas, 0);
    return (suma / resenas.length).toFixed(1) + ' ★ (' + resenas.length + ')';
  };
  const enviarPregunta = (idProd) => {
    const texto = preguntaInput.trim();
    if (texto.length < 10) {
      setMensaje('La pregunta debe tener al menos 10 caracteres');
      return;
    }

    const nuevaPregunta = {
      id: 'PREG-' + Date.now(),
      texto,
      fecha: new Date().toLocaleDateString(),
      estado: 'Pendiente',
      respuesta: '',
    };

    setListaProductos(
      listaProductos.map((item) =>
        item.id === idProd
          ? { ...item, preguntas: [nuevaPregunta, ...(item.preguntas || [])] }
          : item
      )
    );
    setPreguntaInput('');
    setMensaje('Pregunta enviada con estado Pendiente');
  };

  const simularRespuestaPregunta = (idProd, idPregunta) => {
    setListaProductos(
      listaProductos.map((item) => {
        if (item.id !== idProd) return item;
        return {
          ...item,
          preguntas: (item.preguntas || []).map((preg) =>
            preg.id === idPregunta
              ? {
                  ...preg,
                  estado: 'Respondida',
                  respuesta:
                    'Respuesta automática (Modo demostración): Sí, el producto cuenta con disponibilidad según el inventario mostrado y garantía local.',
                }
              : preg
          ),
        };
      })
    );
    setMensaje('Respuesta automática simulada generada');
  };
  const prodDetalle = listaProductos.find((p) => p.id === idDetalle);
  const listaFavoritos = listaProductos.filter((p) => favoritos.includes(p.id));
  const productosComparados = listaProductos.filter((p) => compararIds.includes(p.id));
  const detalleTieneVariantes = prodDetalle && prodDetalle.variantes && prodDetalle.variantes.length > 0;
  const varianteActualEnDetalle =
    detalleTieneVariantes && varianteSeleccionada
      ? prodDetalle.variantes.find((v) => v.id === varianteSeleccionada.id)
      : null;

  const precioMostradoDetalle = varianteActualEnDetalle
    ? varianteActualEnDetalle.precio
    : prodDetalle?.precio || 0;

  const stockMostradoDetalle = varianteActualEnDetalle
    ? varianteActualEnDetalle.stock
    : prodDetalle
    ? obtenerStockTotal(prodDetalle)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Fitsitium</Text>
        <Text style={styles.brandSubtitle}>Tu tienda local · Mosquera, Madrid y Funza</Text>
      </View>
      <View style={styles.mensajeBox}>
        <Text style={styles.mensajeText}>{mensaje}</Text>
      </View>
      <View style={styles.menuTab}>
        <Pressable
          style={[styles.tabBtn, vista === 'catalogo' && styles.tabActive]}
          onPress={() => setVista('catalogo')}
        >
          <Text style={styles.tabText}>Catálogo</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, vista === 'favoritos' && styles.tabActive]}
          onPress={() => setVista('favoritos')}
        >
          <Text style={styles.tabText}>Favs ({favoritos.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, (vista === 'carrito' || vista === 'checkout') && styles.tabActive]}
          onPress={() => setVista('carrito')}
        >
          <Text style={styles.tabText}>Carrito ({carrito.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, (vista === 'historial' || vista === 'detallePedido') && styles.tabActive]}
          onPress={() => setVista('historial')}
        >
          <Text style={styles.tabText}>Pedidos ({historial.length})</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, vista === 'vendedor' && styles.tabActive]}
          onPress={() => setVista('vendedor')}
        >
          <Text style={styles.tabText}>Vendedor</Text>
        </Pressable>
      </View>
      <View style={[styles.rowBetween, { marginBottom: 8 }]}>
        <Pressable
          style={[styles.chipBtn, vista === 'comparar' && styles.tabActive]}
          onPress={() => {
            setVistaAnterior(vista);
            setVista('comparar');
          }}
        >
          <Text style={styles.chipText}>Comparar ({compararIds.length}/3)</Text>
        </Pressable>

        <Pressable
          style={[styles.chipBtn, vista === 'direcciones' && styles.tabActive]}
          onPress={() => {
            setVistaAnterior(vista);
            setVista('direcciones');
          }}
        >
          <Text style={styles.chipText}>Mis direcciones ({direcciones.length})</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {vista === 'catalogo' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Buscar producto..."
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {categorias.map((cat) => (
                <Pressable
                  key={cat}
                  style={[styles.chipBtn, categoriaFiltro === cat && styles.tabActive]}
                  onPress={() => setCategoriaFiltro(cat)}
                >
                  <Text style={styles.chipText}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.rowGap}>
              <Pressable
                style={[styles.chipBtn, ordenPrecio === 'menor' && styles.tabActive]}
                onPress={() => setOrdenPrecio('menor')}
              >
                <Text style={styles.chipText}>Menor a mayor</Text>
              </Pressable>
              <Pressable
                style={[styles.chipBtn, ordenPrecio === 'mayor' && styles.tabActive]}
                onPress={() => setOrdenPrecio('mayor')}
              >
                <Text style={styles.chipText}>Mayor a menor</Text>
              </Pressable>
              <Pressable
                style={[styles.chipBtn, mostrarFiltros && styles.tabActive]}
                onPress={() => setMostrarFiltros(!mostrarFiltros)}
              >
                <Text style={styles.chipText}>{mostrarFiltros ? 'Ocultar filtros' : 'Más filtros'}</Text>
              </Pressable>
            </View>
            {mostrarFiltros && (
              <View style={styles.filterBox}>
                <Text style={styles.cardTitle}>Filtrar por marca:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
                  {marcasDisponibles.map((m) => (
                    <Pressable
                      key={m}
                      style={[styles.chipBtn, marcaFiltro === m && styles.tabActive]}
                      onPress={() => setMarcaFiltro(m)}
                    >
                      <Text style={styles.chipText}>{m}</Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={styles.cardTitle}>Rango de precio (COP):</Text>
                <View style={[styles.rowGap, { marginBottom: 6 }]}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Mínimo"
                    keyboardType="numeric"
                    value={precioMinInput}
                    onChangeText={setPrecioMinInput}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Máximo"
                    keyboardType="numeric"
                    value={precioMaxInput}
                    onChangeText={setPrecioMaxInput}
                  />
                  <Pressable style={styles.btnSmall} onPress={aplicarFiltroPrecio}>
                    <Text style={styles.btnSmallText}>Aplicar</Text>
                  </Pressable>
                </View>

                <View style={styles.rowBetween}>
                  <Pressable
                    style={[styles.chipBtn, soloDisponibles && styles.tabActive]}
                    onPress={() => setSoloDisponibles(!soloDisponibles)}
                  >
                    <Text style={styles.chipText}>
                      {soloDisponibles ? '✓ Solo disponibles' : 'Solo disponibles'}
                    </Text>
                  </Pressable>

                  <Pressable style={styles.btnDelete} onPress={restablecerFiltros}>
                    <Text style={styles.btnDeleteText}>Restablecer</Text>
                  </Pressable>
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>Catálogo ({productosFiltrados.length})</Text>

            {productosFiltrados.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No encontramos productos</Text>
                <Pressable style={styles.btnSmall} onPress={restablecerFiltros}>
                  <Text style={styles.btnSmallText}>Restablecer filtros</Text>
                </Pressable>
              </View>
            ) : (
              productosFiltrados.map((item) => {
                const esFav = favoritos.includes(item.id);
                const enComparar = compararIds.includes(item.id);
                const stockTotal = obtenerStockTotal(item);
                const agotado = stockTotal <= 0 || !item.disponibilidad;
                const conVariantes = item.variantes && item.variantes.length > 0;

                return (
                  <Pressable key={item.id} style={styles.card} onPress={() => abrirDetalle(item.id)}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imageText}>{item.producto[0].toUpperCase()}</Text>
                    </View>

                    <View style={styles.cardInfo}>
                      <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>{item.producto}</Text>
                        <Pressable onPress={() => toggleFavorito(item.id)}>
                          <Text style={{ fontSize: 16, color: esFav ? '#C62828' : '#888' }}>
                            {esFav ? '♥' : '♡'}
                          </Text>
                        </Pressable>
                      </View>

                      <Text style={styles.cardCat}>
                        {item.marca} · {item.categoria} · ${item.precio.toLocaleString('es-CO')} COP
                      </Text>

                      <Text style={{ fontSize: 11, color: agotado ? '#C62828' : 'green' }}>
                        {agotado ? 'Agotado' : 'Disponible (' + stockTotal + ')'}
                        {conVariantes ? ' · ' + item.variantes.length + ' variantes' : ''}
                      </Text>

                      <View style={styles.rowGap}>
                        <Pressable
                          style={[styles.btnSmall, agotado && { backgroundColor: '#DDD' }]}
                          onPress={() => agregarAlCarrito(item)}
                        >
                          <Text style={styles.btnSmallText}>
                            {agotado ? 'Sin stock' : conVariantes ? 'Elegir opción' : '+ Comprar'}
                          </Text>
                        </Pressable>
                        <Pressable style={styles.btnSecundario} onPress={() => abrirDetalle(item.id)}>
                          <Text style={styles.btnSmallText}>Detalle</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.btnSecundario, enComparar && styles.tabActive]}
                          onPress={() => toggleComparar(item.id)}
                        >
                          <Text style={styles.btnSmallText}>
                            {enComparar ? '✓ Comparar' : '+ Comparar'}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        )}
        {vista === 'comparar' && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista('catalogo')}>
              <Text style={styles.btnSmallText}>← Volver al catálogo</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>
              Comparador de Productos ({productosComparados.length}/3)
            </Text>

            {productosComparados.length < 2 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Selecciona entre 2 y 3 productos en el catálogo para verlos en columnas.
                </Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Seleccionar productos</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.compareColumnsRow}>
                {productosComparados.map((prod) => {
                  const stockComp = obtenerStockTotal(prod);
                  return (
                    <View key={prod.id} style={styles.compareCol}>
                      <Text style={styles.cardTitle}>{prod.producto}</Text>
                      <Text style={styles.compareLabel}>Marca:</Text>
                      <Text style={styles.cardDesc}>{prod.marca}</Text>

                      <Text style={styles.compareLabel}>Precio:</Text>
                      <Text style={styles.cardTitle}>
                        ${prod.precio.toLocaleString('es-CO')}
                      </Text>

                      <Text style={styles.compareLabel}>Disponibilidad:</Text>
                      <Text style={{ fontSize: 11, color: stockComp > 0 ? 'green' : '#C62828' }}>
                        {stockComp > 0 ? 'Disponible (' + stockComp + ')' : 'Agotado'}
                      </Text>

                      <Pressable
                        style={[styles.btnDelete, { marginTop: 10, alignSelf: 'stretch', alignItems: 'center' }]}
                        onPress={() => toggleComparar(prod.id)}
                      >
                        <Text style={styles.btnDeleteText}>Quitar</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
        {vista === 'detalle' && prodDetalle && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista(vistaAnterior)}>
              <Text style={styles.btnSmallText}>← Volver</Text>
            </Pressable>

            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start', marginTop: 8 }]}>
              <Text style={styles.cardCat}>
                {prodDetalle.id} · {prodDetalle.marca} · {prodDetalle.categoria}
              </Text>
              <Text style={[styles.brandTitle, { marginVertical: 4 }]}>{prodDetalle.producto}</Text>

              <Text style={styles.totalText}>
                ${precioMostradoDetalle.toLocaleString('es-CO')} COP
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: stockMostradoDetalle > 0 ? 'green' : '#C62828',
                  marginVertical: 4,
                }}
              >
                {detalleTieneVariantes && !varianteActualEnDetalle
                  ? 'Selecciona una variante para ver disponibilidad exacta'
                  : stockMostradoDetalle > 0
                  ? 'Stock disponible: ' + stockMostradoDetalle + ' unidades'
                  : 'Agotado (0 unidades)'}
              </Text>

              <Text style={styles.cardDesc}>{prodDetalle.descripcion}</Text>
              <Text style={styles.cardCat}>Vendedor: {prodDetalle.vendedor}</Text>
              {detalleTieneVariantes && (
                <View style={{ width: '100%', marginTop: 10 }}>
                  <Text style={styles.cardTitle}>Elige una variante:</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                    {prodDetalle.variantes.map((v) => {
                      const seleccionada = varianteSeleccionada?.id === v.id;
                      const varAgotada = v.stock <= 0;

                      return (
                        <Pressable
                          key={v.id}
                          style={[
                            styles.varianteBtn,
                            seleccionada && styles.varianteActive,
                            varAgotada && styles.varianteAgotada,
                          ]}
                          onPress={() => {
                            setVarianteSeleccionada(v);
                            setMensaje(
                              varAgotada
                                ? `Variante "${v.nombre}" sin stock disponible`
                                : `Seleccionado: ${v.nombre} ($${v.precio.toLocaleString('es-CO')} · ${v.stock} uds.)`
                            );
                          }}
                        >
                          <Text style={styles.cardTitle}>{v.nombre}</Text>
                          <Text style={styles.cardCat}>
                            ${v.precio.toLocaleString('es-CO')} ·{' '}
                            {varAgotada ? 'Agotado' : v.stock + ' disp.'}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              )}

              <View style={[styles.rowGap, { marginTop: 12 }]}>
                <Pressable
                  style={[
                    styles.btnSmall,
                    varianteActualEnDetalle && varianteActualEnDetalle.stock <= 0 && { backgroundColor: '#DDD' },
                  ]}
                  onPress={() => agregarAlCarrito(prodDetalle, varianteActualEnDetalle)}
                >
                  <Text style={styles.btnSmallText}>
                    {varianteActualEnDetalle && varianteActualEnDetalle.stock <= 0
                      ? 'Variante agotada'
                      : '+ Agregar al carrito'}
                  </Text>
                </Pressable>
                <Pressable style={styles.btnSecundario} onPress={() => toggleFavorito(prodDetalle.id)}>
                  <Text style={styles.btnSmallText}>
                    {favoritos.includes(prodDetalle.id) ? '♥ Favorito' : '♡ Favorito'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.btnSecundario, compararIds.includes(prodDetalle.id) && styles.tabActive]}
                  onPress={() => toggleComparar(prodDetalle.id)}
                >
                  <Text style={styles.btnSmallText}>
                    {compararIds.includes(prodDetalle.id) ? '✓ Comparar' : '+ Comparar'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <Text style={styles.sectionTitle}>Preguntas sobre el producto</Text>
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder="Escribe tu pregunta (mínimo 10 caracteres)..."
                value={preguntaInput}
                onChangeText={setPreguntaInput}
              />
              <Pressable style={styles.btnSmall} onPress={() => enviarPregunta(prodDetalle.id)}>
                <Text style={styles.btnSmallText}>Enviar pregunta</Text>
              </Pressable>

              {(prodDetalle.preguntas || []).length === 0 ? (
                <Text style={[styles.cardCat, { marginTop: 8 }]}>
                  Aún no hay preguntas para este producto.
                </Text>
              ) : (
                (prodDetalle.preguntas || []).map((preg) => (
                  <View
                    key={preg.id}
                    style={{ marginTop: 8, borderTopWidth: 1, borderColor: '#EEE', width: '100%', paddingTop: 6 }}
                  >
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardCat}>Fecha: {preg.fecha}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: preg.estado === 'Respondida' ? 'green' : '#B26A00',
                        }}
                      >
                        {preg.estado}
                      </Text>
                    </View>
                    <Text style={styles.cardTitle}>P: {preg.texto}</Text>

                    {preg.estado === 'Respondida' ? (
                      <Text style={[styles.cardDesc, { color: '#333', marginTop: 3 }]}>
                        {preg.respuesta}
                      </Text>
                    ) : (
                      <Pressable
                        style={[styles.btnSecundario, { marginTop: 4 }]}
                        onPress={() => simularRespuestaPregunta(prodDetalle.id, preg.id)}
                      >
                        <Text style={styles.btnSmallText}>Simular respuesta (Demo)</Text>
                      </Pressable>
                    )}
                  </View>
                ))
              )}
            </View>
            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start' }]}>
              <Text style={styles.sectionTitle}>
                Reseñas · Promedio: {obtenerPromedio(prodDetalle.resenas)}
              </Text>
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder="Calificación (1 a 5 estrellas)"
                keyboardType="numeric"
                value={estrellasInput}
                onChangeText={setEstrellasInput}
              />
              <TextInput
                style={[styles.input, { width: '100%' }]}
                placeholder="Comentario breve (opcional)"
                value={comentarioInput}
                onChangeText={setComentarioInput}
              />
              <Pressable style={styles.btnSmall} onPress={() => guardarResena(prodDetalle.id)}>
                <Text style={styles.btnSmallText}>Guardar calificación</Text>
              </Pressable>

              {prodDetalle.resenas.map((r, i) => (
                <View key={i} style={{ marginTop: 8, borderTopWidth: 1, borderColor: '#EEE', width: '100%', paddingTop: 4 }}>
                  <Text style={styles.cardTitle}>{'★'.repeat(r.estrellas)} ({r.estrellas}/5)</Text>
                  <Text style={styles.cardDesc}>{r.comentario}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {vista === 'direcciones' && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista(vistaAnterior)}>
              <Text style={styles.btnSmallText}>← Volver</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>
              {editandoDirId ? 'Editar Dirección Ficticia' : 'Mis Direcciones de Entrega'}
            </Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Usa datos ficticios para la simulación académica (no ingreses direcciones reales).
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Alias (ej. Casa Ficticia, Oficina Demo) *"
              value={aliasDir}
              onChangeText={setAliasDir}
            />
            <TextInput
              style={styles.input}
              placeholder="Municipio (ej. Mosquera, Madrid, Funza) *"
              value={municipioDir}
              onChangeText={setMunicipioDir}
            />
            <TextInput
              style={styles.input}
              placeholder="Referencia de entrega (ej. Calle Ficticia 10 # 20-30) *"
              value={referenciaDir}
              onChangeText={setReferenciaDir}
            />

            <Pressable style={styles.toggleBtn} onPress={() => setPrincipalDir(!principalDir)}>
              <Text style={styles.toggleText}>
                Marcar como principal: {principalDir ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <View style={styles.rowGap}>
              <Pressable style={[styles.btnMain, { flex: 1 }]} onPress={guardarDireccion}>
                <Text style={styles.btnMainText}>
                  {editandoDirId ? 'Actualizar dirección' : 'Agregar dirección'}
                </Text>
              </Pressable>
              {editandoDirId && (
                <Pressable style={styles.btnSecundario} onPress={limpiarFormDireccion}>
                  <Text style={styles.btnSmallText}>Cancelar</Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Direcciones guardadas</Text>

            {direcciones.map((dir) => (
              <View key={dir.id} style={styles.card}>
                <View style={styles.cardInfo}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>
                      {dir.alias} · {dir.municipio}
                    </Text>
                    {dir.esPrincipal && (
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'green' }}>
                        Principal
                      </Text>
                    )}
                  </View>
                  <Text style={styles.cardDesc}>{dir.referencia}</Text>

                  <View style={styles.rowGap}>
                    {!dir.esPrincipal && (
                      <Pressable
                        style={styles.btnSmall}
                        onPress={() => marcarDireccionPrincipal(dir.id)}
                      >
                        <Text style={styles.btnSmallText}>Hacer principal</Text>
                      </Pressable>
                    )}
                    <Pressable
                      style={styles.btnSecundario}
                      onPress={() => iniciarEdicionDireccion(dir)}
                    >
                      <Text style={styles.btnSmallText}>Editar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        {vista === 'favoritos' && (
          <View>
            <Text style={styles.sectionTitle}>Mis Favoritos</Text>
            {listaFavoritos.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No tienes productos guardados en favoritos.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Ir al catálogo</Text>
                </Pressable>
              </View>
            ) : (
              listaFavoritos.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>{item.producto[0]}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.producto}</Text>
                    <Text style={styles.cardCat}>${item.precio.toLocaleString('es-CO')} COP</Text>
                    <View style={styles.rowGap}>
                      <Pressable style={styles.btnSmall} onPress={() => agregarAlCarrito(item)}>
                        <Text style={styles.btnSmallText}>+ Al carrito</Text>
                      </Pressable>
                      <Pressable style={styles.btnDelete} onPress={() => toggleFavorito(item.id)}>
                        <Text style={styles.btnDeleteText}>Quitar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
        {vista === 'carrito' && (
          <View>
            <Text style={styles.sectionTitle}>Carrito de Compras</Text>
            {carrito.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Explorar productos</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                {carrito.map((item) => (
                  <View key={item.cartId} style={styles.card}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imageText}>{item.producto[0]}</Text>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item.producto}</Text>

                      {item.varianteNombre && (
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#7EA83B' }}>
                          Opción: {item.varianteNombre} ({item.varianteId})
                        </Text>
                      )}

                      <Text style={styles.cardCat}>
                        ${item.precio.toLocaleString('es-CO')} x {item.cantidad} = $
                        {(item.precio * item.cantidad).toLocaleString('es-CO')} COP
                      </Text>

                      <View style={[styles.rowGap, { marginTop: 6 }]}>
                        <Pressable style={styles.btnSecundario} onPress={() => cambiarCantidad(item.cartId, -1)}>
                          <Text style={styles.btnSmallText}>-</Text>
                        </Pressable>
                        <Text style={{ fontWeight: 'bold', paddingHorizontal: 6 }}>{item.cantidad}</Text>
                        <Pressable style={styles.btnSecundario} onPress={() => cambiarCantidad(item.cartId, 1)}>
                          <Text style={styles.btnSmallText}>+</Text>
                        </Pressable>
                        <Pressable style={styles.btnDelete} onPress={() => eliminarDelCarrito(item.cartId)}>
                          <Text style={styles.btnDeleteText}>Eliminar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
                <View style={styles.rowGap}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Cupón (ej. BIENVENIDO10)"
                    value={cuponInput}
                    onChangeText={setCuponInput}
                  />
                  <Pressable style={styles.btnSmall} onPress={aplicarCupon}>
                    <Text style={styles.btnSmallText}>Aplicar</Text>
                  </Pressable>
                </View>
                <View style={styles.totalBox}>
                  <Text style={styles.cardCat}>Subtotal: ${subtotal.toLocaleString('es-CO')} COP</Text>
                  {descuento > 0 && (
                    <Text style={{ fontSize: 11, color: 'green' }}>
                      Descuento (BIENVENIDO10): -${descuento.toLocaleString('es-CO')} COP
                    </Text>
                  )}
                  <Text style={styles.cardCat}>
                    Envío: {envio === 0 ? 'GRATIS' : '$' + envio.toLocaleString('es-CO') + ' COP'}
                  </Text>
                  <Text style={[styles.totalText, { marginTop: 4 }]}>
                    Total a pagar: ${total.toLocaleString('es-CO')} COP
                  </Text>

                  <Pressable
                    style={[styles.btnMain, { width: '100%', marginTop: 10 }]}
                    onPress={() => setVista('checkout')}
                  >
                    <Text style={styles.btnMainText}>Continuar compra</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}
        {vista === 'checkout' && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista('carrito')}>
              <Text style={styles.btnSmallText}>← Volver al carrito</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Datos de Entrega (Simulación)</Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Prototipo académico: no ingreses tarjetas ni datos personales auténticos.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre ficticio del comprador *"
              value={nombreCliente}
              onChangeText={setNombreCliente}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono simulado *"
              keyboardType="phone-pad"
              value={telefonoCliente}
              onChangeText={setTelefonoCliente}
            />
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Elige una dirección de entrega *:</Text>
              <Pressable
                style={styles.btnSecundario}
                onPress={() => {
                  setVistaAnterior('checkout');
                  setVista('direcciones');
                }}
              >
                <Text style={styles.btnSmallText}>+ Nueva / Editar</Text>
              </Pressable>
            </View>

            <View style={{ marginVertical: 6 }}>
              {direcciones.map((dir) => {
                const seleccionada = direccionSeleccionadaId === dir.id;
                return (
                  <Pressable
                    key={dir.id}
                    style={[styles.card, seleccionada && styles.varianteActive]}
                    onPress={() => {
                      setDireccionSeleccionadaId(dir.id);
                      setMensaje('Dirección seleccionada: ' + dir.alias);
                    }}
                  >
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>
                        {seleccionada ? '● ' : '○ '}
                        {dir.alias} ({dir.municipio}) {dir.esPrincipal ? '· Principal' : ''}
                      </Text>
                      <Text style={styles.cardDesc}>{dir.referencia}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.totalBox}>
              <Text style={styles.cardTitle}>Resumen del pedido:</Text>
              {carrito.map((c) => (
                <Text key={c.cartId} style={styles.cardCat}>
                  • {c.producto} {c.varianteNombre ? `(${c.varianteNombre})` : ''} x{c.cantidad} ($
                  {(c.precio * c.cantidad).toLocaleString('es-CO')})
                </Text>
              ))}
              <Text style={[styles.totalText, { marginTop: 6 }]}>
                Total: ${total.toLocaleString('es-CO')} COP
              </Text>
              <Pressable
                style={[styles.btnMain, { width: '100%', marginTop: 10 }]}
                onPress={confirmarCompra}
              >
                <Text style={styles.btnMainText}>Confirmar compra simulada</Text>
              </Pressable>
            </View>
          </View>
        )}
        {vista === 'historial' && (
          <View>
            <Text style={styles.sectionTitle}>Historial de Pedidos</Text>
            {historial.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Aún no tienes pedidos confirmados.</Text>
                <Pressable style={styles.btnSmall} onPress={() => setVista('catalogo')}>
                  <Text style={styles.btnSmallText}>Ir a comprar</Text>
                </Pressable>
              </View>
            ) : (
              historial.map((ped) => (
                <Pressable
                  key={ped.codigo}
                  style={styles.card}
                  onPress={() => {
                    setPedidoDetalle(ped);
                    setVista('detallePedido');
                  }}
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {ped.codigo} · ${ped.total.toLocaleString('es-CO')} COP
                    </Text>
                    <Text style={styles.cardCat}>Fecha: {ped.fecha}</Text>
                    <Text style={styles.cardDesc}>
                      Entrega: {ped.cliente.nombre} ({ped.cliente.municipio})
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        )}

        {vista === 'detallePedido' && pedidoDetalle && (
          <View>
            <Pressable style={styles.btnSecundario} onPress={() => setVista('historial')}>
              <Text style={styles.btnSmallText}>← Ver historial</Text>
            </Pressable>

            <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start', marginTop: 8 }]}>
              <Text style={styles.brandTitle}>Pedido {pedidoDetalle.codigo}</Text>
              <Text style={styles.cardCat}>Fecha: {pedidoDetalle.fecha}</Text>
              <Text style={{ fontSize: 11, color: 'green', marginVertical: 4 }}>
                Simulación académica confirmada (sin cobro real)
              </Text>
              <Text style={styles.cardDesc}>
                Cliente: {pedidoDetalle.cliente.nombre} · Tel: {pedidoDetalle.cliente.telefono}
              </Text>
              <Text style={styles.cardDesc}>
                Dirección: {pedidoDetalle.cliente.municipio}, {pedidoDetalle.cliente.direccion}
              </Text>

              <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Productos:</Text>
              {pedidoDetalle.items.map((art, idx) => (
                <Text key={idx} style={styles.cardCat}>
                  • {art.producto} {art.varianteNombre ? `[${art.varianteNombre}]` : ''} x{art.cantidad} ($
                  {art.precio.toLocaleString('es-CO')} c/u)
                </Text>
              ))}

              <Text style={[styles.cardCat, { marginTop: 8 }]}>
                Subtotal: ${pedidoDetalle.subtotal.toLocaleString('es-CO')} · Envío:{' '}
                {pedidoDetalle.envio === 0 ? 'GRATIS' : '$' + pedidoDetalle.envio.toLocaleString('es-CO')}
              </Text>
              <Text style={styles.totalText}>
                Total: ${pedidoDetalle.total.toLocaleString('es-CO')} COP
              </Text>
            </View>
          </View>
        )}
        {vista === 'vendedor' && (
          <View>
            <Text style={styles.sectionTitle}>
              {editandoId ? 'Editar Producto (' + editandoId + ')' : 'Panel de Vendedor'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del vendedor"
              value={vendedor}
              onChangeText={setVendedor}
            />
            <TextInput
              style={styles.input}
              placeholder="Marca del producto (ej. RunFlex)"
              value={marcaInput}
              onChangeText={setMarcaInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={producto}
              onChangeText={setProducto}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría (Deporte, Tecnología, Hogar, Mascotas)"
              value={categoria}
              onChangeText={setCategoria}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio en COP"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción (mín 15 caracteres)"
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <TextInput
              style={styles.input}
              placeholder="Stock disponible"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />

            <Pressable style={styles.toggleBtn} onPress={() => setDisponibilidad(!disponibilidad)}>
              <Text style={styles.toggleText}>
                ¿Disponible?: {disponibilidad ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <View style={styles.rowGap}>
              <Pressable style={[styles.btnMain, { flex: 1 }]} onPress={guardarProducto}>
                <Text style={styles.btnMainText}>
                  {editandoId ? 'Actualizar Producto' : 'Guardar Producto'}
                </Text>
              </Pressable>
              {editandoId && (
                <Pressable style={styles.btnSecundario} onPress={limpiarFormularioVendedor}>
                  <Text style={styles.btnSmallText}>Cancelar</Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Inventario de Tienda</Text>

            {listaProductos.map((item) => {
              const stockItem = obtenerStockTotal(item);
              return (
                <View key={item.id} style={styles.cardAdmin}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>
                      {item.producto} (${item.precio.toLocaleString('es-CO')})
                    </Text>
                    <Text style={{ fontSize: 11, color: item.disponibilidad ? 'green' : 'red' }}>
                      {item.id} · {item.marca} · Stock: {stockItem} ·{' '}
                      {item.disponibilidad ? 'Disponible' : 'No disponible'}
                    </Text>
                  </View>

                  <View style={styles.rowGap}>
                    <Pressable style={styles.btnSmall} onPress={() => iniciarEdicion(item)}>
                      <Text style={styles.btnSmallText}>Editar</Text>
                    </Pressable>
                    <Pressable style={styles.btnDelete} onPress={() => eliminarUnProducto(item.id)}>
                      <Text style={styles.btnDeleteText}>Eliminar</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
    paddingTop: 40,
    paddingHorizontal: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  mensajeBox: {
    backgroundColor: '#EFECE6',
    padding: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  mensajeText: {
    fontSize: 11,
    color: '#181818',
    textAlign: 'center',
    fontWeight: '600',
  },
  menuTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#EFECE6',
    borderRadius: 8,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#C5E188',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#181818',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#181818',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    marginBottom: 8,
    fontSize: 13,
  },
  chipBtn: {
    backgroundColor: '#EFECE6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#181818',
  },
  filterBox: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    marginTop: 8,
  },
  compareColumnsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  compareCol: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  compareLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 6,
  },
  rowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 55,
    height: 55,
    backgroundColor: '#EFECE6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7EA83B',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#181818',
  },
  cardCat: {
    fontSize: 11,
    color: '#666',
  },
  cardDesc: {
    fontSize: 11,
    color: '#444',
    marginVertical: 2,
  },
  varianteBtn: {
    backgroundColor: '#F8F8F5',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  varianteActive: {
    backgroundColor: '#C5E188',
    borderColor: '#7EA83B',
  },
  varianteAgotada: {
    backgroundColor: '#F2F2F2',
    opacity: 0.6,
  },
  btnSmall: {
    backgroundColor: '#C5E188',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnSecundario: {
    backgroundColor: '#EFECE6',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnSmallText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#181818',
  },
  btnMain: {
    backgroundColor: '#C5E188',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnMainText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#181818',
  },
  emptyBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
    fontSize: 12,
  },
  totalBox: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#181818',
  },
  cardAdmin: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  btnDelete: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  btnDeleteText: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 11,
  },
  toggleBtn: {
    backgroundColor: '#EFECE6',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#181818',
  },
});