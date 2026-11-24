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
  {
    id: 'DIR-03',
    alias: 'Punto Alterno',
    municipio: 'Madrid',
    referencia: 'Avenida Prueba 8 # 11-05, Portería',
    esPrincipal: false,
  },
];

const TARIFAS_ENVIO = {
  mosquera: {
    estandar: { costo: 6000, plazo: '1 a 2 días' },
    expres: { costo: 10000, plazo: '24 horas (1 día)' },
  },
  funza: {
    estandar: { costo: 8000, plazo: '2 a 3 días' },
    expres: { costo: 12000, plazo: '1 a 2 días' },
  },
  madrid: {
    estandar: { costo: 10000, plazo: '2 a 3 días' },
    expres: { costo: 14000, plazo: '1 a 2 días' },
  },
};

const FILTROS_INICIALES = {
  busqueda: '',
  categoria: 'Todas',
  marca: 'Todas',
  soloDisponibles: false,
  minInput: '',
  maxInput: '',
  rangoMin: null,
  rangoMax: null,
  orden: 'ninguno',
  mostrar: false,
};

const FORM_DIR_INICIAL = {
  editandoId: null,
  alias: '',
  municipio: '',
  referencia: '',
  principal: false,
};

const FORM_VENDEDOR_INICIAL = {
  editandoId: null,
  vendedor: '',
  marca: '',
  producto: '',
  categoria: '',
  precio: '',
  descripcion: '',
  stock: '',
  disponibilidad: true,
};

const formatoCOP = (valor) => '$' + Number(valor || 0).toLocaleString('es-CO');

const BtnVolver = ({ texto = '← Volver', onPress }) => (
  <Pressable style={styles.btnSecundario} onPress={onPress}>
    <Text style={styles.btnSmallText}>{texto}</Text>
  </Pressable>
);

const EstadoVacio = ({ texto, textoBtn, onPress }) => (
  <View style={styles.emptyBox}>
    <Text style={styles.emptyText}>{texto}</Text>
    {textoBtn && (
      <Pressable style={styles.btnSmall} onPress={onPress}>
        <Text style={styles.btnSmallText}>{textoBtn}</Text>
      </Pressable>
    )}
  </View>
);

export default function App() {
  const [vista, setVista] = useState('catalogo');
  const [vistaAnterior, setVistaAnterior] = useState('catalogo');
  const [mensaje, setMensaje] = useState('Bienvenido a Fitsitium');

  const [listaProductos, setListaProductos] = useState(PRODUCTOS_INICIALES);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [direcciones, setDirecciones] = useState(DIRECCIONES_INICIALES);
  const [notificaciones, setNotificaciones] = useState([]);
  const [suscripcionesStock, setSuscripcionesStock] = useState([]);
  const [ticketsSoporte, setTicketsSoporte] = useState([]);

  const [compararIds, setCompararIds] = useState([]);
  const [idDetalle, setIdDetalle] = useState(null);
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [pedidoDetalleCodigo, setPedidoDetalleCodigo] = useState(null);
  const [confirmandoCancelacion, setConfirmandoCancelacion] = useState(false);

  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [formDir, setFormDir] = useState(FORM_DIR_INICIAL);
  const [formVendedor, setFormVendedor] = useState(FORM_VENDEDOR_INICIAL);
  const [formAyuda, setFormAyuda] = useState({ codigo: '', motivo: 'Entrega', descripcion: '' });

  const [cuponInput, setCuponInput] = useState('');
  const [cuponActivo, setCuponActivo] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState(null);
  const [modalidadEnvio, setModalidadEnvio] = useState('');

  const [estrellasInput, setEstrellasInput] = useState('5');
  const [comentarioInput, setComentarioInput] = useState('');
  const [preguntaInput, setPreguntaInput] = useState('');

  useEffect(() => {
    try {
      const guardado = globalThis?.localStorage?.getItem('fitsitium_datos_v4');
      if (!guardado) return;
      const d = JSON.parse(guardado);
      if (Array.isArray(d.listaProductos) && d.listaProductos.length > 0) {
        setListaProductos(
          d.listaProductos.map((p) => ({
            ...p,
            marca: p.marca || p.vendedor || 'Fitsitium',
            stock: Math.max(0, Number(p.stock) || 0),
            precio: Math.max(1, Number(p.precio) || 1000),
            variantes: Array.isArray(p.variantes) ? p.variantes : [],
            preguntas: Array.isArray(p.preguntas) ? p.preguntas : [],
          }))
        );
      }
      if (Array.isArray(d.favoritos)) setFavoritos(d.favoritos);
      if (Array.isArray(d.carrito)) setCarrito(d.carrito);
      if (Array.isArray(d.historial)) setHistorial(d.historial);
      if (Array.isArray(d.direcciones) && d.direcciones.length > 0) setDirecciones(d.direcciones);
      if (Array.isArray(d.notificaciones)) setNotificaciones(d.notificaciones);
      if (Array.isArray(d.suscripcionesStock)) setSuscripcionesStock(d.suscripcionesStock);
      if (Array.isArray(d.ticketsSoporte)) setTicketsSoporte(d.ticketsSoporte);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      globalThis?.localStorage?.setItem(
        'fitsitium_datos_v4',
        JSON.stringify({
          listaProductos,
          favoritos,
          carrito,
          historial,
          direcciones,
          notificaciones,
          suscripcionesStock,
          ticketsSoporte,
        })
      );
    } catch (e) {}
  }, [
    listaProductos,
    favoritos,
    carrito,
    historial,
    direcciones,
    notificaciones,
    suscripcionesStock,
    ticketsSoporte,
  ]);

  const navegarConRetorno = (nuevaVista) => {
    setVistaAnterior(vista);
    setVista(nuevaVista);
  };

  const obtenerStockTotal = (prod) =>
    prod.variantes?.length > 0
      ? prod.variantes.reduce((acc, v) => acc + v.stock, 0)
      : prod.stock;

  const claveSub = (prodId, varId = null) => (varId ? `${prodId}-${varId}` : prodId);

  const registrarNotificacion = (eventoKey, titulo, detalle) => {
    setNotificaciones((prev) => {
      if (prev.some((n) => n.eventoKey === eventoKey)) return prev;
      return [
        {
          id: 'NOTIF-' + Date.now() + '-' + prev.length,
          eventoKey,
          titulo,
          detalle,
          fecha: new Date().toLocaleString(),
          leida: false,
        },
        ...prev,
      ];
    });
  };

  const marcarNotificacionLeida = (idNotif) => {
    setNotificaciones(notificaciones.map((n) => (n.id === idNotif ? { ...n, leida: true } : n)));
    setMensaje('Aviso marcado como leído');
  };

  const actualizarInventario = (movimientos) => {
    setListaProductos((prev) =>
      prev.map((prod) => {
        const movs = movimientos.filter((m) => m.id === prod.id);
        if (movs.length === 0) return prod;

        if (prod.variantes?.length > 0) {
          const nuevasVar = prod.variantes.map((v) => {
            const delta = movs
              .filter((m) => m.varianteId === v.id)
              .reduce((acc, m) => acc + m.delta, 0);
            return delta !== 0 ? { ...v, stock: Math.max(0, v.stock + delta) } : v;
          });
          const total = nuevasVar.reduce((acc, v) => acc + v.stock, 0);
          return { ...prod, variantes: nuevasVar, stock: total, disponibilidad: total > 0 };
        }

        const deltaTotal = movs.reduce((acc, m) => acc + m.delta, 0);
        const nuevoStock = Math.max(0, prod.stock + deltaTotal);
        return { ...prod, stock: nuevoStock, disponibilidad: nuevoStock > 0 };
      })
    );
  };

  const abrirDetalle = (id) => {
    if (vista !== 'detalle') setVistaAnterior(vista);
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
    } else if (compararIds.length >= 3) {
      setMensaje('Límite alcanzado: máximo 3 productos para comparar');
    } else {
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
    const min = filtros.minInput.trim() === '' ? null : Number(filtros.minInput);
    const max = filtros.maxInput.trim() === '' ? null : Number(filtros.maxInput);

    if ((min !== null && (isNaN(min) || min < 0)) || (max !== null && (isNaN(max) || max < 0))) {
      setMensaje('Error: Ingresa valores numéricos válidos para el precio');
      return;
    }
    if (min !== null && max !== null && min > max) {
      setMensaje('Error: El precio mínimo no puede ser mayor que el máximo');
      return;
    }
    setFiltros({ ...filtros, rangoMin: min, rangoMax: max });
    setMensaje('Rango de precio aplicado');
  };

  const restablecerFiltros = () => {
    setFiltros(FILTROS_INICIALES);
    setMensaje('Filtros restablecidos');
  };

  const productosFiltrados = listaProductos
    .filter((item) => {
      const stockItem = obtenerStockTotal(item);
      return (
        item.producto.toLowerCase().includes(filtros.busqueda.toLowerCase()) &&
        (filtros.categoria === 'Todas' || item.categoria === filtros.categoria) &&
        (filtros.marca === 'Todas' || item.marca === filtros.marca) &&
        (!filtros.soloDisponibles || (stockItem > 0 && item.disponibilidad)) &&
        (filtros.rangoMin === null || item.precio >= filtros.rangoMin) &&
        (filtros.rangoMax === null || item.precio <= filtros.rangoMax)
      );
    })
    .sort((a, b) =>
      filtros.orden === 'menor'
        ? a.precio - b.precio
        : filtros.orden === 'mayor'
        ? b.precio - a.precio
        : 0
    );

  const toggleFavorito = (id) => {
    const existe = favoritos.includes(id);
    setFavoritos(existe ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
    setMensaje(existe ? 'Quitado de favoritos' : 'Guardado en favoritos');
  };

  const agregarAlCarrito = (item, variante = null) => {
    const prodActual = listaProductos.find((p) => p.id === item.id);
    if (!prodActual) return;

    const tieneVariantes = prodActual.variantes?.length > 0;
    if (tieneVariantes && !variante) {
      if (vista !== 'detalle' || idDetalle !== prodActual.id) abrirDetalle(prodActual.id);
      setMensaje('Elige una variante (talla, color o tamaño) antes de agregar');
      return;
    }

    const varActual =
      tieneVariantes && variante
        ? prodActual.variantes.find((v) => v.id === variante.id)
        : null;

    if (tieneVariantes && (!varActual || varActual.stock <= 0)) {
      setMensaje('La variante seleccionada está agotada');
      return;
    }
    if (!tieneVariantes && (prodActual.stock <= 0 || !prodActual.disponibilidad)) {
      setMensaje('Este producto está agotado');
      return;
    }

    const stockDisponible = varActual ? varActual.stock : prodActual.stock;
    const precioFinal = varActual ? varActual.precio : prodActual.precio;
    const cartId = claveSub(prodActual.id, varActual?.id);

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
          varianteId: varActual?.id || null,
          varianteNombre: varActual?.nombre || null,
          producto: prodActual.producto,
          categoria: prodActual.categoria,
          precio: precioFinal,
          cantidad: 1,
        },
      ]);
    }

    setMensaje(
      'Agregado al carrito: ' +
        (varActual ? `${prodActual.producto} (${varActual.nombre})` : prodActual.producto)
    );
  };

  const cambiarCantidad = (cartId, cambio) => {
    const itemCarrito = carrito.find((c) => c.cartId === cartId);
    const prodActual = itemCarrito && listaProductos.find((p) => p.id === itemCarrito.id);
    if (!itemCarrito || !prodActual) return;

    const stockMax = itemCarrito.varianteId
      ? prodActual.variantes?.find((v) => v.id === itemCarrito.varianteId)?.stock || 0
      : prodActual.stock;
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
    } else if (cuponInput.trim().toUpperCase() === 'BIENVENIDO10') {
      setCuponActivo('BIENVENIDO10');
      setMensaje('Cupón BIENVENIDO10 aplicado (10% de descuento)');
    } else {
      setMensaje('Cupón no válido. Prueba con BIENVENIDO10');
    }
  };

  const calcularEstimacionEnvio = (dirObj, modalidad) => {
    if (!dirObj || !modalidad) {
      return {
        valido: false,
        costo: 0,
        plazo: 'Pendiente de seleccionar dirección y modalidad',
        motivo: 'Faltan datos',
      };
    }
    const tarifa = TARIFAS_ENVIO[dirObj.municipio.trim().toLowerCase()]?.[modalidad];
    if (tarifa) return { valido: true, ...tarifa };

    return {
      valido: false,
      costo: 0,
      plazo: 'No disponible',
      motivo: `Municipio "${dirObj.municipio}" sin tarifa automática. Requiere ajuste manual o elige Mosquera, Funza o Madrid.`,
    };
  };

  const direccionElegida = direcciones.find((d) => d.id === direccionSeleccionadaId) || null;
  const infoEnvio = calcularEstimacionEnvio(direccionElegida, modalidadEnvio);

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuento =
    carrito.length > 0 && cuponActivo === 'BIENVENIDO10' ? Math.round(subtotal * 0.1) : 0;
  const envio = carrito.length === 0 || !infoEnvio.valido ? 0 : infoEnvio.costo;
  const total = carrito.length === 0 ? 0 : Math.max(0, subtotal - descuento + envio);

  const guardarDireccion = () => {
    if (!formDir.alias.trim()) {
      setMensaje('Ingresa un alias para la dirección (ej. Casa Ficticia)');
      return;
    }
    if (!formDir.municipio.trim()) {
      setMensaje('Ingresa el municipio de entrega');
      return;
    }
    if (!formDir.referencia.trim()) {
      setMensaje('Ingresa una referencia de entrega válida');
      return;
    }

    if (formDir.editandoId) {
      setDirecciones(
        direcciones.map((d) =>
          d.id === formDir.editandoId
            ? {
                ...d,
                alias: formDir.alias.trim(),
                municipio: formDir.municipio.trim(),
                referencia: formDir.referencia.trim(),
                esPrincipal: formDir.principal ? true : d.esPrincipal,
              }
            : formDir.principal
            ? { ...d, esPrincipal: false }
            : d
        )
      );
      setMensaje('Dirección actualizada correctamente');
    } else {
      const esPrin = formDir.principal || direcciones.length === 0;
      const nuevaDir = {
        id: 'DIR-' + Date.now(),
        alias: formDir.alias.trim(),
        municipio: formDir.municipio.trim(),
        referencia: formDir.referencia.trim(),
        esPrincipal: esPrin,
      };
      setDirecciones([
        ...(esPrin ? direcciones.map((d) => ({ ...d, esPrincipal: false })) : direcciones),
        nuevaDir,
      ]);
      setMensaje('Dirección "' + nuevaDir.alias + '" agregada');
    }
    setFormDir(FORM_DIR_INICIAL);
  };

  const marcarDireccionPrincipal = (id) => {
    setDirecciones(direcciones.map((d) => ({ ...d, esPrincipal: d.id === id })));
    setMensaje('Dirección principal actualizada');
  };

  const confirmarCompra = () => {
    if (!nombreCliente.trim()) return setMensaje('Falta ingresar el nombre ficticio del comprador');
    if (!telefonoCliente.trim()) return setMensaje('Falta ingresar el teléfono simulado');
    if (!direccionElegida) return setMensaje('Elige una dirección de entrega antes de confirmar');
    if (!modalidadEnvio) return setMensaje('Elige una modalidad de envío (Estándar o Exprés)');
    if (!infoEnvio.valido) return setMensaje(infoEnvio.motivo);

    const sinStock = carrito.find((item) => {
      const prod = listaProductos.find((p) => p.id === item.id);
      if (!prod) return true;
      const disp = item.varianteId
        ? prod.variantes?.find((v) => v.id === item.varianteId)?.stock || 0
        : prod.stock;
      return disp < item.cantidad;
    });
    if (sinStock) return setMensaje('Stock insuficiente para: ' + sinStock.producto);

    actualizarInventario(
      carrito.map((c) => ({ id: c.id, varianteId: c.varianteId, delta: -c.cantidad }))
    );

    const ahora = new Date().toLocaleString();
    const codigoPedido = 'PED-' + (1001 + historial.length);
    const nuevoPedido = {
      codigo: codigoPedido,
      fecha: ahora,
      estado: 'Confirmado',
      stockReintegrado: false,
      historialEstados: [
        {
          estado: 'Confirmado',
          fecha: ahora,
          nota: 'Pedido confirmado (simulación sin cobro real)',
        },
      ],
      cliente: {
        nombre: nombreCliente.trim(),
        telefono: telefonoCliente.trim(),
        municipio: direccionElegida.municipio,
        direccion: `${direccionElegida.alias}: ${direccionElegida.referencia}`,
      },
      modalidadEnvio: modalidadEnvio === 'estandar' ? 'Estándar' : 'Exprés',
      plazoEnvio: infoEnvio.plazo,
      items: carrito.map((item) => ({ ...item })),
      subtotal,
      descuento,
      envio,
      total,
    };

    setHistorial([nuevoPedido, ...historial]);
    registrarNotificacion(
      `${codigoPedido}-Confirmado`,
      `Pedido ${codigoPedido}: Confirmado`,
      `Tu compra simulada por ${formatoCOP(total)} COP fue confirmada.`
    );
    setCarrito([]);
    setCuponActivo('');
    setCuponInput('');
    setNombreCliente('');
    setTelefonoCliente('');
    setDireccionSeleccionadaId(null);
    setModalidadEnvio('');
    setPedidoDetalleCodigo(codigoPedido);
    setConfirmandoCancelacion(false);
    setVista('detallePedido');
    setMensaje('¡Compra simulada confirmada! (Sin cobro real)');
  };

  const simularAvanceEntrega = (codigo) => {
    const ped = historial.find((p) => p.codigo === codigo);
    if (!ped) return;
    if (ped.estado === 'Entregado' || ped.estado === 'Cancelado') {
      return setMensaje(`El pedido ${ped.codigo} está ${ped.estado} y no permite más avances`);
    }
    const flujo = { Confirmado: 'Preparando', Preparando: 'En camino', 'En camino': 'Entregado' };
    const siguienteEstado = flujo[ped.estado];
    if (!siguienteEstado) return;

    const ahora = new Date().toLocaleString();
    setHistorial(
      historial.map((p) =>
        p.codigo === codigo
          ? {
              ...p,
              estado: siguienteEstado,
              historialEstados: [
                ...(p.historialEstados || []),
                { estado: siguienteEstado, fecha: ahora, nota: 'Avance simulado de entrega' },
              ],
            }
          : p
      )
    );
    registrarNotificacion(
      `${ped.codigo}-${siguienteEstado}`,
      `Pedido ${ped.codigo}: ${siguienteEstado}`,
      `El estado de tu pedido cambió a "${siguienteEstado}".`
    );
    setMensaje(`Estado actualizado a: ${siguienteEstado}`);
  };

  const solicitarCancelacion = (ped) => {
    if (ped.estado === 'Cancelado') return setMensaje('Este pedido ya se encuentra Cancelado');
    if (ped.estado === 'En camino' || ped.estado === 'Entregado') {
      return setMensaje(`No se puede cancelar: el pedido ya está ${ped.estado}`);
    }
    setConfirmandoCancelacion(true);
  };

  const confirmarCancelacionPedido = (codigo) => {
    const ped = historial.find((p) => p.codigo === codigo);
    if (!ped) return;
    if (ped.estado === 'Cancelado' || ped.stockReintegrado) {
      setConfirmandoCancelacion(false);
      return setMensaje('El pedido ya estaba cancelado; no se duplican unidades');
    }
    if (ped.estado === 'En camino' || ped.estado === 'Entregado') {
      setConfirmandoCancelacion(false);
      return setMensaje(`No se puede cancelar: el pedido ya está ${ped.estado}`);
    }

    actualizarInventario(
      ped.items.map((i) => ({ id: i.id, varianteId: i.varianteId, delta: i.cantidad }))
    );

    const ahora = new Date().toLocaleString();
    setHistorial(
      historial.map((p) =>
        p.codigo === codigo
          ? {
              ...p,
              estado: 'Cancelado',
              stockReintegrado: true,
              historialEstados: [
                ...(p.historialEstados || []),
                {
                  estado: 'Cancelado',
                  fecha: ahora,
                  nota: 'Cancelación lógica confirmada y stock reintegrado',
                },
              ],
            }
          : p
      )
    );
    registrarNotificacion(
      `${ped.codigo}-Cancelado`,
      `Pedido ${ped.codigo}: Cancelado`,
      'Tu pedido fue cancelado y las unidades fueron reintegradas al inventario.'
    );
    setConfirmandoCancelacion(false);
    setMensaje('Pedido cancelado y unidades reintegradas al stock');
  };

  const toggleSuscripcionStock = (prod, variante = null) => {
    const subKey = claveSub(prod.id, variante?.id);
    const existente = suscripcionesStock.find((s) => s.subKey === subKey);

    if (existente) {
      const nuevaActiva = !existente.activa;
      setSuscripcionesStock(
        suscripcionesStock.map((s) => (s.subKey === subKey ? { ...s, activa: nuevaActiva } : s))
      );
      setMensaje(
        nuevaActiva ? 'Aviso de reposición activado' : 'Suscripción de aviso de stock cancelada'
      );
    } else {
      setSuscripcionesStock([
        ...suscripcionesStock,
        {
          subKey,
          productoId: prod.id,
          varianteId: variante?.id || null,
          nombreArticulo: variante ? `${prod.producto} (${variante.nombre})` : prod.producto,
          activa: true,
        },
      ]);
      setMensaje('Te avisaremos dentro de la app cuando vuelva a haber stock');
    }
  };

  const simularReposicionDemo = (prodId, varId = null) => {
    const prod = listaProductos.find((p) => p.id === prodId);
    if (!prod) return;

    const unidadesAgregadas = 5;
    const varObj = varId ? prod.variantes?.find((v) => v.id === varId) : null;
    const nombreNotif = varObj ? `${prod.producto} (${varObj.nombre})` : prod.producto;

    actualizarInventario([{ id: prodId, varianteId: varId, delta: unidadesAgregadas }]);

    const subKey = claveSub(prodId, varId);
    if (suscripcionesStock.some((s) => s.subKey === subKey && s.activa)) {
      registrarNotificacion(
        `RESTOCK-${subKey}-${Date.now()}`,
        `¡Reposición disponible! ${nombreNotif}`,
        `Modo demostración: Se repusieron ${unidadesAgregadas} unidades de ${nombreNotif}.`
      );
      setSuscripcionesStock(
        suscripcionesStock.map((s) => (s.subKey === subKey ? { ...s, activa: false } : s))
      );
      setMensaje(`Reposición demo aplicada (+${unidadesAgregadas} uds.) y aviso generado`);
    } else {
      setMensaje(`Reposición demo aplicada (+${unidadesAgregadas} uds. a ${nombreNotif})`);
    }
  };

  const enviarSolicitudAyuda = () => {
    if (!formAyuda.codigo) {
      return setMensaje('Selecciona un pedido del historial antes de enviar la solicitud');
    }
    if (!formAyuda.motivo) return setMensaje('Selecciona un motivo (Entrega, Producto u Otro)');
    if (formAyuda.descripcion.trim().length < 15) {
      return setMensaje('La descripción debe tener al menos 15 caracteres');
    }

    const nuevoTicket = {
      id: 'CASO-' + (101 + ticketsSoporte.length),
      pedidoCodigo: formAyuda.codigo,
      motivo: formAyuda.motivo,
      descripcion: formAyuda.descripcion.trim(),
      fecha: new Date().toLocaleString(),
      estado: 'Abierto',
      respuesta: '',
    };
    setTicketsSoporte([nuevoTicket, ...ticketsSoporte]);
    setFormAyuda({ ...formAyuda, descripcion: '' });
    setMensaje(`Solicitud ${nuevoTicket.id} creada con estado Abierto`);
  };

  const simularRespuestaSoporte = (idCaso) => {
    const ticket = ticketsSoporte.find((t) => t.id === idCaso);
    if (!ticket || ticket.estado === 'Respondido') return;

    setTicketsSoporte(
      ticketsSoporte.map((t) =>
        t.id === idCaso
          ? {
              ...t,
              estado: 'Respondido',
              respuesta: `Respuesta de prueba (Modo simulación): Hemos registrado tu novedad (${t.motivo}) para el pedido ${t.pedidoCodigo}. Nuestro equipo académico ha actualizado tu caso.`,
            }
          : t
      )
    );
    registrarNotificacion(
      `SOPORTE-${idCaso}`,
      `Soporte ${idCaso}: Respondido`,
      `Tu solicitud sobre el pedido ${ticket.pedidoCodigo} recibió una respuesta de prueba.`
    );
    setMensaje(`Caso ${idCaso} actualizado a Respondido`);
  };

  const iniciarEdicion = (item) => {
    setFormVendedor({
      editandoId: item.id,
      vendedor: item.vendedor,
      marca: item.marca || '',
      producto: item.producto,
      categoria: item.categoria,
      precio: String(item.precio),
      descripcion: item.descripcion,
      stock: String(obtenerStockTotal(item)),
      disponibilidad: item.disponibilidad,
    });
    setMensaje('Editando: ' + item.producto);
  };

  const guardarProducto = () => {
    const precioNum = Number(formVendedor.precio);
    const stockNum = Number(formVendedor.stock);

    if (!formVendedor.vendedor.trim()) return setMensaje('Ingrese el nombre del vendedor');
    if (!formVendedor.producto.trim()) return setMensaje('Ingrese el nombre del producto');
    if (!formVendedor.categoria.trim()) return setMensaje('Ingrese la categoría');
    if (
      !formVendedor.precio.trim() ||
      isNaN(precioNum) ||
      precioNum <= 0 ||
      !Number.isInteger(precioNum)
    ) {
      return setMensaje('El precio debe ser un entero positivo en COP');
    }
    if (formVendedor.descripcion.trim().length < 15) {
      return setMensaje('La descripción debe tener mínimo 15 caracteres');
    }
    if (
      formVendedor.stock.trim() === '' ||
      isNaN(stockNum) ||
      stockNum < 0 ||
      !Number.isInteger(stockNum)
    ) {
      return setMensaje('El stock debe ser un entero igual o mayor a 0');
    }

    const datosBase = {
      vendedor: formVendedor.vendedor.trim(),
      marca: formVendedor.marca.trim() || formVendedor.vendedor.trim(),
      producto: formVendedor.producto.trim(),
      categoria: formVendedor.categoria.trim(),
      precio: precioNum,
      descripcion: formVendedor.descripcion.trim(),
      stock: stockNum,
      disponibilidad: stockNum > 0 ? formVendedor.disponibilidad : false,
    };

    if (formVendedor.editandoId) {
      setListaProductos(
        listaProductos.map((item) =>
          item.id === formVendedor.editandoId
            ? {
                ...item,
                ...datosBase,
                variantes:
                  stockNum === 0 && item.variantes?.length > 0
                    ? item.variantes.map((v) => ({ ...v, stock: 0 }))
                    : item.variantes,
              }
            : item
        )
      );
      setMensaje('Producto actualizado sin duplicar');
    } else {
      const nuevoId = 'PROD-' + String(listaProductos.length + 1).padStart(3, '0');
      setListaProductos([
        ...listaProductos,
        { id: nuevoId, ...datosBase, variantes: [], resenas: [], preguntas: [] },
      ]);
      setMensaje('Producto agregado con ID ' + nuevoId);
    }
    setFormVendedor(FORM_VENDEDOR_INICIAL);
  };

  const eliminarUnProducto = (id) => {
    const prod = listaProductos.find((p) => p.id === id);
    if (prod && prod.disponibilidad && obtenerStockTotal(prod) > 0) {
      return setMensaje('Solo se pueden eliminar productos no disponibles');
    }
    setListaProductos(listaProductos.filter((p) => p.id !== id));
    setCompararIds(compararIds.filter((cId) => cId !== id));
    if (formVendedor.editandoId === id) setFormVendedor(FORM_VENDEDOR_INICIAL);
    setMensaje('Producto eliminado correctamente');
  };

  const guardarResena = (idProd) => {
    const valor = Number(estrellasInput);
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      return setMensaje('Error: La calificación debe ser un número entero entre 1 y 5');
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
    if (!resenas?.length) return 'Sin calificaciones';
    const suma = resenas.reduce((acc, r) => acc + r.estrellas, 0);
    return (suma / resenas.length).toFixed(1) + ' ★ (' + resenas.length + ')';
  };

  const enviarPregunta = (idProd) => {
    const texto = preguntaInput.trim();
    if (texto.length < 10) return setMensaje('La pregunta debe tener al menos 10 caracteres');

    const nueva = {
      id: 'PREG-' + Date.now(),
      texto,
      fecha: new Date().toLocaleDateString(),
      estado: 'Pendiente',
      respuesta: '',
    };
    setListaProductos(
      listaProductos.map((item) =>
        item.id === idProd ? { ...item, preguntas: [nueva, ...(item.preguntas || [])] } : item
      )
    );
    setPreguntaInput('');
    setMensaje('Pregunta enviada con estado Pendiente');
  };

  const simularRespuestaPregunta = (idProd, idPregunta) => {
    setListaProductos(
      listaProductos.map((item) =>
        item.id !== idProd
          ? item
          : {
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
            }
      )
    );
    setMensaje('Respuesta automática simulada generada');
  };

  const prodDetalle = listaProductos.find((p) => p.id === idDetalle);
  const listaFavoritos = listaProductos.filter((p) => favoritos.includes(p.id));
  const productosComparados = listaProductos.filter((p) => compararIds.includes(p.id));
  const pedidoDetalle = historial.find((p) => p.codigo === pedidoDetalleCodigo) || null;
  const noLeidasCount = notificaciones.filter((n) => !n.leida).length;

  const productosRelacionados = prodDetalle
    ? listaProductos
        .filter(
          (p) =>
            p.id !== prodDetalle.id &&
            p.categoria === prodDetalle.categoria &&
            p.disponibilidad &&
            obtenerStockTotal(p) > 0
        )
        .slice(0, 4)
    : [];

  const detalleTieneVariantes = prodDetalle?.variantes?.length > 0;
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

  const articuloAgotadoEnDetalle = prodDetalle
    ? detalleTieneVariantes
      ? Boolean(varianteActualEnDetalle && varianteActualEnDetalle.stock <= 0)
      : prodDetalle.stock <= 0
    : false;

  const claveSubDetalle = prodDetalle
    ? claveSub(prodDetalle.id, varianteActualEnDetalle?.id)
    : '';
  const suscritoEnDetalle = suscripcionesStock.some(
    (s) => s.subKey === claveSubDetalle && s.activa
  );

  const tabsPrincipales = [
    { id: 'catalogo', label: 'Catálogo', activo: vista === 'catalogo' },
    { id: 'favoritos', label: `Favs (${favoritos.length})`, activo: vista === 'favoritos' },
    {
      id: 'carrito',
      label: `Carrito (${carrito.length})`,
      activo: vista === 'carrito' || vista === 'checkout',
    },
    {
      id: 'historial',
      label: `Pedidos (${historial.length})`,
      activo: vista === 'historial' || vista === 'detallePedido',
    },
    { id: 'vendedor', label: 'Vendedor', activo: vista === 'vendedor' },
  ];

  const chipsSecundarios = [
    { id: 'comparar', label: `Comparar (${compararIds.length}/3)` },
    { id: 'direcciones', label: `Direcciones (${direcciones.length})` },
    {
      id: 'notificaciones',
      label: `Avisos (${noLeidasCount > 0 ? `${noLeidasCount} nuevos` : notificaciones.length})`,
    },
    { id: 'ayuda', label: `Ayuda (${ticketsSoporte.length})` },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Fitsitium</Text>
        <Text style={styles.brandSubtitle}>Tu tienda local · Mosquera, Madrid y Funza</Text>
        <Text style={styles.brandSubtitle}>Todo lo que te mueve, en un solo lugar.</Text>
      </View>

      <View style={styles.mensajeBox}>
        <Text style={styles.mensajeText}>{mensaje}</Text>
      </View>

      <View style={styles.menuTab}>
        {tabsPrincipales.map((tab) => (
          <Pressable
            key={tab.id}
            style={[styles.tabBtn, tab.activo && styles.tabActive]}
            onPress={() => setVista(tab.id)}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.rowBetween, { marginBottom: 8, flexWrap: 'wrap', gap: 4 }]}>
        {chipsSecundarios.map((chip) => (
          <Pressable
            key={chip.id}
            style={[styles.chipBtn, vista === chip.id && styles.tabActive]}
            onPress={() => navegarConRetorno(chip.id)}
          >
            <Text style={styles.chipText}>{chip.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {vista === 'catalogo' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Buscar producto..."
              value={filtros.busqueda}
              onChangeText={(busqueda) => setFiltros({ ...filtros, busqueda })}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {categorias.map((cat) => (
                <Pressable
                  key={cat}
                  style={[styles.chipBtn, filtros.categoria === cat && styles.tabActive]}
                  onPress={() => setFiltros({ ...filtros, categoria: cat })}
                >
                  <Text style={styles.chipText}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.rowGap}>
              {[
                { id: 'menor', label: 'Menor a mayor' },
                { id: 'mayor', label: 'Mayor a menor' },
              ].map((ord) => (
                <Pressable
                  key={ord.id}
                  style={[styles.chipBtn, filtros.orden === ord.id && styles.tabActive]}
                  onPress={() => setFiltros({ ...filtros, orden: ord.id })}
                >
                  <Text style={styles.chipText}>{ord.label}</Text>
                </Pressable>
              ))}
              <Pressable
                style={[styles.chipBtn, filtros.mostrar && styles.tabActive]}
                onPress={() => setFiltros({ ...filtros, mostrar: !filtros.mostrar })}
              >
                <Text style={styles.chipText}>
                  {filtros.mostrar ? 'Ocultar filtros' : 'Más filtros'}
                </Text>
              </Pressable>
            </View>

            {filtros.mostrar && (
              <View style={styles.filterBox}>
                <Text style={styles.cardTitle}>Filtrar por marca:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginVertical: 6 }}
                >
                  {marcasDisponibles.map((m) => (
                    <Pressable
                      key={m}
                      style={[styles.chipBtn, filtros.marca === m && styles.tabActive]}
                      onPress={() => setFiltros({ ...filtros, marca: m })}
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
                    value={filtros.minInput}
                    onChangeText={(minInput) => setFiltros({ ...filtros, minInput })}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Máximo"
                    keyboardType="numeric"
                    value={filtros.maxInput}
                    onChangeText={(maxInput) => setFiltros({ ...filtros, maxInput })}
                  />
                  <Pressable style={styles.btnSmall} onPress={aplicarFiltroPrecio}>
                    <Text style={styles.btnSmallText}>Aplicar</Text>
                  </Pressable>
                </View>

                <View style={styles.rowBetween}>
                  <Pressable
                    style={[styles.chipBtn, filtros.soloDisponibles && styles.tabActive]}
                    onPress={() =>
                      setFiltros({ ...filtros, soloDisponibles: !filtros.soloDisponibles })
                    }
                  >
                    <Text style={styles.chipText}>
                      {filtros.soloDisponibles ? '✓ Solo disponibles' : 'Solo disponibles'}
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
              <EstadoVacio
                texto="No encontramos productos con esos filtros"
                textoBtn="Restablecer filtros"
                onPress={restablecerFiltros}
              />
            ) : (
              productosFiltrados.map((item) => {
                const esFav = favoritos.includes(item.id);
                const enComparar = compararIds.includes(item.id);
                const stockTotal = obtenerStockTotal(item);
                const agotado = stockTotal <= 0 || !item.disponibilidad;
                const conVariantes = item.variantes?.length > 0;

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
                        {item.marca} · {item.categoria} · {formatoCOP(item.precio)} COP
                      </Text>

                      <Text style={{ fontSize: 11, color: agotado ? '#C62828' : 'green' }}>
                        {agotado ? 'Agotado' : 'Disponible (' + stockTotal + ')'}
                        {conVariantes ? ' · ' + item.variantes.length + ' variantes' : ''}
                      </Text>

                      <View style={styles.rowGap}>
                        <Pressable
                          style={[styles.btnSmall, agotado && { backgroundColor: '#DDD' }]}
                          onPress={() => (agotado ? abrirDetalle(item.id) : agregarAlCarrito(item))}
                        >
                          <Text style={styles.btnSmallText}>
                            {agotado ? 'Avisar stock' : conVariantes ? 'Elegir opción' : '+ Comprar'}
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
            <BtnVolver texto="← Volver al catálogo" onPress={() => setVista('catalogo')} />
            <Text style={styles.sectionTitle}>
              Comparador de Productos ({productosComparados.length}/3)
            </Text>

            {productosComparados.length < 2 ? (
              <EstadoVacio
                texto="Selecciona entre 2 y 3 productos en el catálogo para verlos en columnas."
                textoBtn="Seleccionar productos"
                onPress={() => setVista('catalogo')}
              />
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
                      <Text style={styles.cardTitle}>{formatoCOP(prod.precio)}</Text>
                      <Text style={styles.compareLabel}>Disponibilidad:</Text>
                      <Text style={{ fontSize: 11, color: stockComp > 0 ? 'green' : '#C62828' }}>
                        {stockComp > 0 ? 'Disponible (' + stockComp + ')' : 'Agotado'}
                      </Text>
                      <Pressable
                        style={[
                          styles.btnDelete,
                          { marginTop: 10, alignSelf: 'stretch', alignItems: 'center' },
                        ]}
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
            <BtnVolver onPress={() => setVista(vistaAnterior)} />

            <View style={[styles.card, styles.cardCol, { marginTop: 8 }]}>
              <Text style={styles.cardCat}>
                {prodDetalle.id} · {prodDetalle.marca} · {prodDetalle.categoria}
              </Text>
              <Text style={[styles.brandTitle, { marginVertical: 4 }]}>{prodDetalle.producto}</Text>
              <Text style={styles.totalText}>{formatoCOP(precioMostradoDetalle)} COP</Text>
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
                                : `Seleccionado: ${v.nombre} (${formatoCOP(v.precio)} · ${v.stock} uds.)`
                            );
                          }}
                        >
                          <Text style={styles.cardTitle}>{v.nombre}</Text>
                          <Text style={styles.cardCat}>
                            {formatoCOP(v.precio)} · {varAgotada ? 'Agotado' : v.stock + ' disp.'}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              )}

              {articuloAgotadoEnDetalle && (
                <View style={styles.restockBox}>
                  <Text style={styles.cardTitle}>
                    Artículo agotado{' '}
                    {varianteActualEnDetalle ? `(${varianteActualEnDetalle.nombre})` : ''}
                  </Text>
                  <Text style={styles.cardCat}>
                    Activa un aviso interno para enterarte cuando haya unidades disponibles:
                  </Text>
                  <View style={[styles.rowGap, { marginTop: 6 }]}>
                    <Pressable
                      style={[styles.btnSmall, suscritoEnDetalle && { backgroundColor: '#FFCDD2' }]}
                      onPress={() => toggleSuscripcionStock(prodDetalle, varianteActualEnDetalle)}
                    >
                      <Text style={styles.btnSmallText}>
                        {suscritoEnDetalle
                          ? 'Cancelar aviso de reposición'
                          : 'Avisarme cuando haya stock'}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnSecundario}
                      onPress={() =>
                        simularReposicionDemo(prodDetalle.id, varianteActualEnDetalle?.id || null)
                      }
                    >
                      <Text style={styles.btnSmallText}>Simular reposición +5 uds. (Demo)</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              <View style={[styles.rowGap, { marginTop: 12 }]}>
                <Pressable
                  style={[styles.btnSmall, articuloAgotadoEnDetalle && { backgroundColor: '#DDD' }]}
                  onPress={() => agregarAlCarrito(prodDetalle, varianteActualEnDetalle)}
                >
                  <Text style={styles.btnSmallText}>
                    {articuloAgotadoEnDetalle ? 'Sin stock' : '+ Agregar al carrito'}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.btnSecundario}
                  onPress={() => toggleFavorito(prodDetalle.id)}
                >
                  <Text style={styles.btnSmallText}>
                    {favoritos.includes(prodDetalle.id) ? '♥ Favorito' : '♡ Favorito'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.btnSecundario,
                    compararIds.includes(prodDetalle.id) && styles.tabActive,
                  ]}
                  onPress={() => toggleComparar(prodDetalle.id)}
                >
                  <Text style={styles.btnSmallText}>
                    {compararIds.includes(prodDetalle.id) ? '✓ Comparar' : '+ Comparar'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.card, styles.cardCol]}>
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
                prodDetalle.preguntas.map((preg) => (
                  <View key={preg.id} style={styles.subItemDivider}>
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

            <View style={[styles.card, styles.cardCol]}>
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
                <View key={i} style={styles.subItemDivider}>
                  <Text style={styles.cardTitle}>
                    {'★'.repeat(r.estrellas)} ({r.estrellas}/5)
                  </Text>
                  <Text style={styles.cardDesc}>{r.comentario}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.card, styles.cardCol]}>
              <Text style={styles.sectionTitle}>
                Productos relacionados · {prodDetalle.categoria}
              </Text>
              {productosRelacionados.length === 0 ? (
                <Text style={styles.cardCat}>
                  No hay otros productos disponibles en esta categoría por el momento.
                </Text>
              ) : (
                productosRelacionados.map((rel) => {
                  const variantesDisp = (rel.variantes || []).filter((v) => v.stock > 0);
                  return (
                    <Pressable
                      key={rel.id}
                      style={[styles.restockBox, { marginTop: 6, padding: 8 }]}
                      onPress={() => abrirDetalle(rel.id)}
                    >
                      <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>{rel.producto}</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#4E7A14' }}>
                          Ver detalle →
                        </Text>
                      </View>
                      <Text style={styles.cardCat}>
                        {rel.marca} · {formatoCOP(rel.precio)} COP · Stock: {obtenerStockTotal(rel)}{' '}
                        uds.
                      </Text>
                      {variantesDisp.length > 0 && (
                        <Text style={{ fontSize: 10, color: '#555', marginTop: 2 }}>
                          Opciones disponibles: {variantesDisp.map((v) => v.nombre).join(', ')}
                        </Text>
                      )}
                    </Pressable>
                  );
                })
              )}
            </View>
          </View>
        )}

        {vista === 'direcciones' && (
          <View>
            <BtnVolver onPress={() => setVista(vistaAnterior)} />
            <Text style={styles.sectionTitle}>
              {formDir.editandoId ? 'Editar Dirección Ficticia' : 'Mis Direcciones de Entrega'}
            </Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Usa datos ficticios para la simulación académica (no ingreses direcciones reales).
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Alias (ej. Casa Ficticia, Oficina Demo) *"
              value={formDir.alias}
              onChangeText={(alias) => setFormDir({ ...formDir, alias })}
            />
            <TextInput
              style={styles.input}
              placeholder="Municipio (Mosquera, Funza, Madrid) *"
              value={formDir.municipio}
              onChangeText={(municipio) => setFormDir({ ...formDir, municipio })}
            />
            <TextInput
              style={styles.input}
              placeholder="Referencia de entrega (ej. Calle Ficticia 10 # 20-30) *"
              value={formDir.referencia}
              onChangeText={(referencia) => setFormDir({ ...formDir, referencia })}
            />

            <Pressable
              style={styles.toggleBtn}
              onPress={() => setFormDir({ ...formDir, principal: !formDir.principal })}
            >
              <Text style={styles.toggleText}>
                Marcar como principal: {formDir.principal ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <View style={styles.rowGap}>
              <Pressable style={[styles.btnMain, { flex: 1 }]} onPress={guardarDireccion}>
                <Text style={styles.btnMainText}>
                  {formDir.editandoId ? 'Actualizar dirección' : 'Agregar dirección'}
                </Text>
              </Pressable>
              {formDir.editandoId && (
                <Pressable
                  style={styles.btnSecundario}
                  onPress={() => setFormDir(FORM_DIR_INICIAL)}
                >
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
                        ★ Principal
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
                      onPress={() => {
                        setFormDir({
                          editandoId: dir.id,
                          alias: dir.alias,
                          municipio: dir.municipio,
                          referencia: dir.referencia,
                          principal: dir.esPrincipal,
                        });
                        setMensaje('Editando dirección: ' + dir.alias);
                      }}
                    >
                      <Text style={styles.btnSmallText}>Editar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {vista === 'notificaciones' && (
          <View>
            <BtnVolver onPress={() => setVista(vistaAnterior)} />
            <Text style={styles.sectionTitle}>
              Centro de Notificaciones Interno ({noLeidasCount} sin leer)
            </Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Avisos internos de simulación académica (sin envíos push externos).
            </Text>

            {notificaciones.length === 0 ? (
              <EstadoVacio
                texto="No tienes notificaciones por el momento. Aquí aparecerán cambios en tus pedidos y avisos de reposición."
                textoBtn="Ir al catálogo"
                onPress={() => setVista('catalogo')}
              />
            ) : (
              notificaciones.map((notif) => (
                <Pressable
                  key={notif.id}
                  style={[
                    styles.card,
                    !notif.leida && { borderColor: '#7EA83B', backgroundColor: '#F6FAE8' },
                  ]}
                  onPress={() => marcarNotificacionLeida(notif.id)}
                >
                  <View style={styles.cardInfo}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardTitle}>{notif.titulo}</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: notif.leida ? '#777' : '#4E7A14',
                        }}
                      >
                        {notif.leida ? 'Leída' : '● Nueva (toca para leer)'}
                      </Text>
                    </View>
                    <Text style={styles.cardDesc}>{notif.detalle}</Text>
                    <Text style={styles.cardCat}>{notif.fecha}</Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        )}

        {vista === 'ayuda' && (
          <View>
            <BtnVolver onPress={() => setVista(vistaAnterior)} />
            <Text style={styles.sectionTitle}>Centro de Ayuda y Solicitudes</Text>
            <Text style={[styles.cardCat, { marginBottom: 8 }]}>
              Registra una novedad asociada a uno de tus pedidos simulados.
            </Text>

            <View style={[styles.card, styles.cardCol]}>
              <Text style={styles.cardTitle}>1. Selecciona el pedido asociado *:</Text>
              {historial.length === 0 ? (
                <Text style={[styles.cardCat, { marginVertical: 6 }]}>
                  No tienes pedidos en tu historial todavía. Confirma una compra para asociarla.
                </Text>
              ) : (
                <View style={[styles.rowGap, { marginVertical: 6 }]}>
                  {historial.map((ped) => (
                    <Pressable
                      key={ped.codigo}
                      style={[
                        styles.chipBtn,
                        formAyuda.codigo === ped.codigo && styles.tabActive,
                      ]}
                      onPress={() => setFormAyuda({ ...formAyuda, codigo: ped.codigo })}
                    >
                      <Text style={styles.chipText}>
                        {ped.codigo} ({formatoCOP(ped.total)})
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              <Text style={[styles.cardTitle, { marginTop: 4 }]}>2. Motivo de la solicitud *:</Text>
              <View style={[styles.rowGap, { marginVertical: 6 }]}>
                {['Entrega', 'Producto', 'Otro'].map((mot) => (
                  <Pressable
                    key={mot}
                    style={[styles.chipBtn, formAyuda.motivo === mot && styles.tabActive]}
                    onPress={() => setFormAyuda({ ...formAyuda, motivo: mot })}
                  >
                    <Text style={styles.chipText}>{mot}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.cardTitle, { marginTop: 4 }]}>
                3. Descripción del inconveniente (mínimo 15 caracteres) *:
              </Text>
              <TextInput
                style={[styles.input, { width: '100%', marginTop: 6 }]}
                placeholder="Describe brevemente lo ocurrido con tu pedido..."
                value={formAyuda.descripcion}
                onChangeText={(descripcion) => setFormAyuda({ ...formAyuda, descripcion })}
              />

              <Pressable
                style={[styles.btnMain, { width: '100%', marginTop: 4 }]}
                onPress={enviarSolicitudAyuda}
              >
                <Text style={styles.btnMainText}>Enviar solicitud</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Mis Casos Registrados ({ticketsSoporte.length})</Text>
            {ticketsSoporte.length === 0 ? (
              <EstadoVacio texto="Aún no has registrado solicitudes de soporte." />
            ) : (
              ticketsSoporte.map((ticket) => (
                <View key={ticket.id} style={[styles.card, styles.cardCol]}>
                  <View style={[styles.rowBetween, { width: '100%' }]}>
                    <Text style={styles.cardTitle}>
                      {ticket.id} · Pedido {ticket.pedidoCodigo} ({ticket.motivo})
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: ticket.estado === 'Respondido' ? 'green' : '#B26A00',
                      }}
                    >
                      {ticket.estado}
                    </Text>
                  </View>
                  <Text style={styles.cardCat}>Fecha: {ticket.fecha}</Text>
                  <Text style={styles.cardDesc}>{ticket.descripcion}</Text>
                  {ticket.estado === 'Respondido' ? (
                    <View style={[styles.restockBox, { marginTop: 6, padding: 8 }]}>
                      <Text style={styles.cardDesc}>{ticket.respuesta}</Text>
                    </View>
                  ) : (
                    <Pressable
                      style={[styles.btnSecundario, { marginTop: 6 }]}
                      onPress={() => simularRespuestaSoporte(ticket.id)}
                    >
                      <Text style={styles.btnSmallText}>Simular respuesta</Text>
                    </Pressable>
                  )}
                </View>
              ))
            )}
          </View>
        )}

        {vista === 'favoritos' && (
          <View>
            <Text style={styles.sectionTitle}>Mis Favoritos</Text>
            {listaFavoritos.length === 0 ? (
              <EstadoVacio
                texto="No tienes productos guardados en favoritos."
                textoBtn="Ir al catálogo"
                onPress={() => setVista('catalogo')}
              />
            ) : (
              listaFavoritos.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>{item.producto[0]}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.producto}</Text>
                    <Text style={styles.cardCat}>{formatoCOP(item.precio)} COP</Text>
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
              <EstadoVacio
                texto="Tu carrito está vacío."
                textoBtn="Explorar productos"
                onPress={() => setVista('catalogo')}
              />
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
                        {formatoCOP(item.precio)} x {item.cantidad} ={' '}
                        {formatoCOP(item.precio * item.cantidad)} COP
                      </Text>

                      <View style={[styles.rowGap, { marginTop: 6 }]}>
                        <Pressable
                          style={styles.btnSecundario}
                          onPress={() => cambiarCantidad(item.cartId, -1)}
                        >
                          <Text style={styles.btnSmallText}>-</Text>
                        </Pressable>
                        <Text style={{ fontWeight: 'bold', paddingHorizontal: 6 }}>
                          {item.cantidad}
                        </Text>
                        <Pressable
                          style={styles.btnSecundario}
                          onPress={() => cambiarCantidad(item.cartId, 1)}
                        >
                          <Text style={styles.btnSmallText}>+</Text>
                        </Pressable>
                        <Pressable
                          style={styles.btnDelete}
                          onPress={() => eliminarDelCarrito(item.cartId)}
                        >
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
                  <Text style={styles.cardCat}>Subtotal: {formatoCOP(subtotal)} COP</Text>
                  {descuento > 0 && (
                    <Text style={{ fontSize: 11, color: 'green' }}>
                      Descuento (BIENVENIDO10): -{formatoCOP(descuento)} COP
                    </Text>
                  )}
                  <Text style={styles.cardCat}>
                    Envío: Se calcula al elegir municipio y modalidad en el siguiente paso
                  </Text>
                  <Text style={[styles.totalText, { marginTop: 4 }]}>
                    Subtotal con descuento: {formatoCOP(Math.max(0, subtotal - descuento))} COP
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
            <BtnVolver texto="← Volver al carrito" onPress={() => setVista('carrito')} />
            <Text style={styles.sectionTitle}>Datos de Entrega y Envío (Simulación)</Text>
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
              <Text style={styles.cardTitle}>1. Elige dirección de entrega *:</Text>
              <Pressable
                style={styles.btnSecundario}
                onPress={() => navegarConRetorno('direcciones')}
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
                      setMensaje(`Dirección seleccionada: ${dir.alias} (${dir.municipio})`);
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

            <Text style={styles.cardTitle}>2. Elige modalidad de envío *:</Text>
            <View style={[styles.rowGap, { marginVertical: 6 }]}>
              {[
                {
                  id: 'estandar',
                  titulo: 'Envío Estándar',
                  detalle: 'Mosquera $6.000 · Funza $8.000 · Madrid $10.000',
                  msg: 'Modalidad Estándar seleccionada',
                },
                {
                  id: 'expres',
                  titulo: 'Envío Exprés',
                  detalle: 'Mosquera $10.000 · Funza $12.000 · Madrid $14.000',
                  msg: 'Modalidad Exprés seleccionada',
                },
              ].map((mod) => (
                <Pressable
                  key={mod.id}
                  style={[
                    styles.varianteBtn,
                    { flex: 1 },
                    modalidadEnvio === mod.id && styles.varianteActive,
                  ]}
                  onPress={() => {
                    setModalidadEnvio(mod.id);
                    setMensaje(mod.msg);
                  }}
                >
                  <Text style={styles.cardTitle}>{mod.titulo}</Text>
                  <Text style={styles.cardCat}>{mod.detalle}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.filterBox}>
              <Text style={styles.cardTitle}>Estimación de envío:</Text>
              {!direccionElegida || !modalidadEnvio ? (
                <Text style={styles.cardCat}>
                  Selecciona dirección y modalidad para calcular costo y plazo.
                </Text>
              ) : infoEnvio.valido ? (
                <View>
                  <Text style={styles.cardDesc}>
                    Destino: {direccionElegida.municipio} · Modalidad:{' '}
                    {modalidadEnvio === 'estandar' ? 'Estándar' : 'Exprés'}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'green' }}>
                    Costo de envío: {formatoCOP(infoEnvio.costo)} COP · Plazo estimado:{' '}
                    {infoEnvio.plazo}
                  </Text>
                </View>
              ) : (
                <Text style={{ fontSize: 11, color: '#C62828', fontWeight: '600' }}>
                  {infoEnvio.motivo}
                </Text>
              )}
            </View>

            <View style={styles.totalBox}>
              <Text style={styles.cardTitle}>Resumen del pedido:</Text>
              {carrito.map((c) => (
                <Text key={c.cartId} style={styles.cardCat}>
                  - {c.producto} {c.varianteNombre ? `(${c.varianteNombre})` : ''} x{c.cantidad} (
                  {formatoCOP(c.precio * c.cantidad)})
                </Text>
              ))}
              <Text style={[styles.cardCat, { marginTop: 6 }]}>
                Subtotal: {formatoCOP(subtotal)} COP
              </Text>
              {descuento > 0 && (
                <Text style={{ fontSize: 11, color: 'green' }}>
                  Descuento: -{formatoCOP(descuento)} COP
                </Text>
              )}
              <Text style={styles.cardCat}>
                Envío:{' '}
                {infoEnvio.valido ? `${formatoCOP(envio)} COP (${infoEnvio.plazo})` : 'Por definir'}
              </Text>
              <Text style={[styles.totalText, { marginTop: 6 }]}>
                Total a pagar: {formatoCOP(total)} COP
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
            <Text style={styles.sectionTitle}>Mis Pedidos</Text>
            {historial.length === 0 ? (
              <EstadoVacio
                texto="Aún no tienes pedidos confirmados."
                textoBtn="Ir a comprar"
                onPress={() => setVista('catalogo')}
              />
            ) : (
              historial.map((ped) => (
                <Pressable
                  key={ped.codigo}
                  style={styles.card}
                  onPress={() => {
                    setPedidoDetalleCodigo(ped.codigo);
                    setConfirmandoCancelacion(false);
                    setVista('detallePedido');
                  }}
                >
                  <View style={styles.cardInfo}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardTitle}>
                        {ped.codigo} · {formatoCOP(ped.total)} COP
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          color:
                            ped.estado === 'Cancelado'
                              ? '#C62828'
                              : ped.estado === 'Entregado'
                              ? 'green'
                              : '#4E7A14',
                        }}
                      >
                        {ped.estado}
                      </Text>
                    </View>
                    <Text style={styles.cardCat}>Fecha: {ped.fecha}</Text>
                    <Text style={styles.cardDesc}>
                      Entrega: {ped.cliente.nombre} ({ped.cliente.municipio}) · Envío{' '}
                      {ped.modalidadEnvio || 'Estándar'}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        )}

        {vista === 'detallePedido' && pedidoDetalle && (
          <View>
            <BtnVolver texto="← Ver todos mis pedidos" onPress={() => setVista('historial')} />

            <View style={[styles.card, styles.cardCol, { marginTop: 8 }]}>
              <View style={[styles.rowBetween, { width: '100%' }]}>
                <Text style={styles.brandTitle}>Pedido {pedidoDetalle.codigo}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: pedidoDetalle.estado === 'Cancelado' ? '#C62828' : 'green',
                  }}
                >
                  Estado: {pedidoDetalle.estado}
                </Text>
              </View>

              <Text style={styles.cardCat}>Fecha creación: {pedidoDetalle.fecha}</Text>
              <Text style={styles.cardDesc}>
                Cliente: {pedidoDetalle.cliente.nombre} · Tel: {pedidoDetalle.cliente.telefono}
              </Text>
              <Text style={styles.cardDesc}>
                Dirección: {pedidoDetalle.cliente.municipio}, {pedidoDetalle.cliente.direccion}
              </Text>
              <Text style={styles.cardDesc}>
                Modalidad envío: {pedidoDetalle.modalidadEnvio || 'Estándar'} (
                {pedidoDetalle.plazoEnvio || '1 a 2 días'})
              </Text>

              <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Productos:</Text>
              {pedidoDetalle.items.map((art, idx) => (
                <Text key={idx} style={styles.cardCat}>
                  - {art.producto} {art.varianteNombre ? `[${art.varianteNombre}]` : ''} x
                  {art.cantidad} ({formatoCOP(art.precio)} c/u)
                </Text>
              ))}

              <Text style={[styles.cardCat, { marginTop: 8 }]}>
                Subtotal: {formatoCOP(pedidoDetalle.subtotal)} · Envío:{' '}
                {formatoCOP(pedidoDetalle.envio)}
              </Text>
              <Text style={styles.totalText}>Total: {formatoCOP(pedidoDetalle.total)} COP</Text>

              <View style={[styles.subItemDivider, { marginTop: 12, paddingTop: 10 }]}>
                <Text style={styles.cardTitle}>Acciones de seguimiento y gestión:</Text>
                <View style={[styles.rowGap, { marginTop: 6 }]}>
                  <Pressable
                    style={[
                      styles.btnSmall,
                      (pedidoDetalle.estado === 'Entregado' ||
                        pedidoDetalle.estado === 'Cancelado') && { backgroundColor: '#DDD' },
                    ]}
                    onPress={() => simularAvanceEntrega(pedidoDetalle.codigo)}
                  >
                    <Text style={styles.btnSmallText}>Simular avance de entrega</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.btnDelete,
                      ['En camino', 'Entregado', 'Cancelado'].includes(pedidoDetalle.estado) && {
                        backgroundColor: '#EEE',
                      },
                    ]}
                    onPress={() => solicitarCancelacion(pedidoDetalle)}
                  >
                    <Text
                      style={[
                        styles.btnDeleteText,
                        ['En camino', 'Entregado', 'Cancelado'].includes(pedidoDetalle.estado) && {
                          color: '#777',
                        },
                      ]}
                    >
                      Cancelar compra
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.btnSecundario}
                    onPress={() => {
                      setFormAyuda({ ...formAyuda, codigo: pedidoDetalle.codigo });
                      navegarConRetorno('ayuda');
                    }}
                  >
                    <Text style={styles.btnSmallText}>Pedir ayuda</Text>
                  </Pressable>
                </View>

                {confirmandoCancelacion && (
                  <View style={styles.restockBox}>
                    <Text style={styles.cardTitle}>
                      ¿Confirmas cancelar el pedido {pedidoDetalle.codigo}?
                    </Text>
                    <Text style={styles.cardCat}>
                      Se reintegrarán las unidades al inventario y el pedido quedará marcado como
                      Cancelado.
                    </Text>
                    <View style={[styles.rowGap, { marginTop: 6 }]}>
                      <Pressable
                        style={styles.btnDelete}
                        onPress={() => confirmarCancelacionPedido(pedidoDetalle.codigo)}
                      >
                        <Text style={styles.btnDeleteText}>Sí, confirmar cancelación</Text>
                      </Pressable>
                      <Pressable
                        style={styles.btnSecundario}
                        onPress={() => setConfirmandoCancelacion(false)}
                      >
                        <Text style={styles.btnSmallText}>No, volver</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>

              <View style={[styles.subItemDivider, { marginTop: 12, paddingTop: 8 }]}>
                <Text style={styles.sectionTitle}>Historial cronológico de estados</Text>
                {(pedidoDetalle.historialEstados || []).map((ev, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <Text style={styles.cardTitle}>
                      {index + 1}. {ev.estado} · <Text style={styles.cardCat}>{ev.fecha}</Text>
                    </Text>
                    <Text style={styles.cardDesc}>{ev.nota}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {vista === 'vendedor' && (
          <View>
            <Text style={styles.sectionTitle}>
              {formVendedor.editandoId
                ? `Editar Producto (${formVendedor.editandoId})`
                : 'Panel de Vendedor'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre del vendedor"
              value={formVendedor.vendedor}
              onChangeText={(vendedor) => setFormVendedor({ ...formVendedor, vendedor })}
            />
            <TextInput
              style={styles.input}
              placeholder="Marca del producto (ej. RunFlex)"
              value={formVendedor.marca}
              onChangeText={(marca) => setFormVendedor({ ...formVendedor, marca })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={formVendedor.producto}
              onChangeText={(producto) => setFormVendedor({ ...formVendedor, producto })}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría (Deporte, Tecnología, Hogar, Mascotas)"
              value={formVendedor.categoria}
              onChangeText={(categoria) => setFormVendedor({ ...formVendedor, categoria })}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio en COP"
              keyboardType="numeric"
              value={formVendedor.precio}
              onChangeText={(precio) => setFormVendedor({ ...formVendedor, precio })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción (mín 15 caracteres)"
              value={formVendedor.descripcion}
              onChangeText={(descripcion) => setFormVendedor({ ...formVendedor, descripcion })}
            />
            <TextInput
              style={styles.input}
              placeholder="Stock disponible"
              keyboardType="numeric"
              value={formVendedor.stock}
              onChangeText={(stock) => setFormVendedor({ ...formVendedor, stock })}
            />

            <Pressable
              style={styles.toggleBtn}
              onPress={() =>
                setFormVendedor({ ...formVendedor, disponibilidad: !formVendedor.disponibilidad })
              }
            >
              <Text style={styles.toggleText}>
                ¿Disponible?: {formVendedor.disponibilidad ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <View style={styles.rowGap}>
              <Pressable style={[styles.btnMain, { flex: 1 }]} onPress={guardarProducto}>
                <Text style={styles.btnMainText}>
                  {formVendedor.editandoId ? 'Actualizar Producto' : 'Guardar Producto'}
                </Text>
              </Pressable>
              {formVendedor.editandoId && (
                <Pressable
                  style={styles.btnSecundario}
                  onPress={() => setFormVendedor(FORM_VENDEDOR_INICIAL)}
                >
                  <Text style={styles.btnSmallText}>Cancelar</Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Inventario de Tienda</Text>
            {listaProductos.map((item) => (
              <View key={item.id} style={styles.cardAdmin}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {item.producto} ({formatoCOP(item.precio)})
                  </Text>
                  <Text style={{ fontSize: 11, color: item.disponibilidad ? 'green' : 'red' }}>
                    {item.id} · {item.marca} · Stock: {obtenerStockTotal(item)} ·{' '}
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
            ))}
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
    paddingHorizontal: 9,
    borderRadius: 6,
    marginRight: 4,
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
  restockBox: {
    backgroundColor: '#F8F8F5',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '100%',
    marginTop: 10,
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
  cardCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  subItemDivider: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#EEE',
    width: '100%',
    paddingTop: 6,
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