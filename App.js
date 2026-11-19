import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';

export default function App() {
  const [vendedor, setVendedor] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [mensaje, setMensaje] = useState('Ingrese los datos del producto');
  
  const [listaProductos, setListaProductos] = useState([
    {
      vendedor: 'FitStore',
      producto: 'Tenis Deportivos',
      categoria: 'Deporte',
      precio: '150000',
      descripcion: 'Cómodos tenis para running.',
      stock: '10',
      disponibilidad: true,
    },
    {
      vendedor: 'TechShop',
      producto: 'Audífonos Bluetooth',
      categoria: 'Tecnología',
      precio: '85000',
      descripcion: 'Audífonos inalámbricos.',
      stock: '5',
      disponibilidad: true,
    }
  ]);
  const [busqueda, setBusqueda] = useState('');
  const [vista, setVista] = useState('catalogo');
  const [carrito, setCarrito] = useState([]);
  const agregarProducto = () => {
    if (!vendedor.trim()) {
      setMensaje('Ingrese el nombre del vendedor');
      return;
    }
    if (!producto.trim()) {
      setMensaje('Ingrese el producto a vender');
      return;
    }
    if (!categoria.trim()) {
      setMensaje('Por favor, ingrese la categoría');
      return;
    }
    if (!precio.trim()) {
      setMensaje('Ingrese el precio del producto');
      return;
    }
    if (!descripcion.trim()) {
      setMensaje('Ingrese la descripcion del producto');
      return;
    }
    if (!stock.trim()) {
      setMensaje('Ingrese la cantidad de productos a vender');
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
  };
  const eliminarUnProducto = (index) => {
    if (listaProductos[index].disponibilidad) {
      setMensaje('Solo se pueden eliminar productos no disponibles');
      return;
    }
    setListaProductos(listaProductos.filter((_, i) => i !== index));
    setMensaje('Producto eliminado correctamente');
  };
  const buscadorProductos = listaProductos.filter((item) =>
    item.producto.toLowerCase().includes(busqueda.toLowerCase())
  );
  const agregarAlCarrito = (item) => {
    if (Number(item.stock) <= 0) {
      alert('Este producto no tiene stock');
      return;
    }
    setCarrito([...carrito, { ...item, cantidad: 1 }]);
    alert('¡Agregado al carrito!');
  };
  const subtotal = carrito.reduce((acc, item) => acc + Number(item.precio) * item.cantidad, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Fitsitium</Text>
        <Text style={styles.brandSubtitle}>Tienda Móvil</Text>
      </View>
      <View style={styles.menuTab}>
        <Pressable 
          style={[styles.tabBtn, vista === 'catalogo' && styles.tabActive]} 
          onPress={() => setVista('catalogo')}
        >
          <Text style={styles.tabText}>Catálogo</Text>
        </Pressable>
        <Pressable 
          style={[styles.tabBtn, vista === 'carrito' && styles.tabActive]} 
          onPress={() => setVista('carrito')}
        >
          <Text style={styles.tabText}>Carrito ({carrito.length})</Text>
        </Pressable>
        <Pressable 
          style={[styles.tabBtn, vista === 'vendedor' && styles.tabActive]} 
          onPress={() => setVista('vendedor')}
        >
          <Text style={styles.tabText}>Vendedor</Text>
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

            <Text style={styles.sectionTitle}>Catálogo de Productos</Text>

            {buscadorProductos.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>
                    {item.producto ? item.producto[0].toUpperCase() : 'P'}
                  </Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.producto}</Text>
                  <Text style={styles.cardCat}>{item.categoria} - ${item.precio} COP</Text>
                  <Text style={styles.cardDesc}>{item.descripcion}</Text>

                  <Pressable style={styles.btnSmall} onPress={() => agregarAlCarrito(item)}>
                    <Text style={styles.btnSmallText}>+ Comprar</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
        {vista === 'carrito' && (
          <View>
            <Text style={styles.sectionTitle}>Carrito de Compras</Text>
            {carrito.length === 0 ? (
              <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
            ) : (
              carrito.map((item, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>{item.producto[0]}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.producto}</Text>
                    <Text style={styles.cardCat}>${item.precio} COP (Cant: {item.cantidad})</Text>
                  </View>
                </View>
              ))
            )}

            {carrito.length > 0 && (
              <View style={styles.totalBox}>
                <Text style={styles.totalText}>Total a pagar: ${subtotal} COP</Text>
              </View>
            )}
          </View>
        )}
        {vista === 'vendedor' && (
          <View>
            <Text style={styles.sectionTitle}>Panel de Vendedor</Text>
            <View style={styles.mensajeBox}>
              <Text style={styles.mensajeText}>{mensaje}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nombre del vendedor"
              value={vendedor}
              onChangeText={setVendedor}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              value={producto}
              onChangeText={setProducto}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría"
              value={categoria}
              onChangeText={setCategoria}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
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

            <Pressable 
              style={styles.toggleBtn} 
              onPress={() => setDisponibilidad(!disponibilidad)}
            >
              <Text style={styles.toggleText}>
                ¿Disponible?: {disponibilidad ? 'Sí' : 'No'}
              </Text>
            </Pressable>

            <Pressable style={styles.btnMain} onPress={agregarProducto}>
              <Text style={styles.btnMainText}>Guardar Producto</Text>
            </Pressable>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Eliminar Productos (Solo si no están disponibles)</Text>
            
            {listaProductos.map((item, index) => (
              <View key={index} style={styles.cardAdmin}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.producto}</Text>
                  <Text style={{ fontSize: 11, color: item.disponibilidad ? 'green' : 'red' }}>
                    {item.disponibilidad ? 'Disponible' : 'No disponible (Se puede eliminar)'}
                  </Text>
                </View>
                <Pressable style={styles.btnDelete} onPress={() => eliminarUnProducto(index)}>
                  <Text style={styles.btnDeleteText}>Eliminar</Text>
                </Pressable>
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
       paddingHorizontal: 16
     },
  header: {
     alignItems: 'center', 
     marginBottom: 10
     },
  brandTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
     color: '#181818'
     },
  brandSubtitle: { 
    fontSize: 11,
     color: '#666'
     },
  menuTab: { 
    flexDirection: 'row',
     justifyContent: 'space-between',
      marginBottom: 12, 
      backgroundColor: '#EFECE6',
       borderRadius: 8, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 8, 
    alignItems: 'center',
     borderRadius: 6
     },
  tabActive: { 
    backgroundColor: '#C5E188'
   },
  tabText: { 
    fontWeight: 'bold', 
    fontSize: 12,
     color: '#181818' 
    },
  content: {
     flex: 1
     },
  sectionTitle: { 
    fontSize: 15,
     fontWeight: 'bold',
      marginVertical: 8, 
      color: '#181818' 
    },
  input: {
     backgroundColor: '#FFF',
      borderWidth: 1,
       borderColor: '#DDD',
        borderRadius: 8,
         paddingHorizontal: 10, 
         height: 38,
          marginBottom: 8,
           fontSize: 13 
          },
  card: { 
    flexDirection: 'row',
     backgroundColor: '#FFF',
      borderRadius: 8,
       padding: 10,
        marginBottom: 8,
         borderWidth: 1, 
         borderColor: '#EEE', 
         alignItems: 'center'
         },
  imagePlaceholder: {
     width: 55, 
     height: 55,
      backgroundColor: '#EFECE6', 
      borderRadius: 8, 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginRight: 10 
    },
  imageText: {
     fontSize: 20,
      fontWeight: 'bold',
       color: '#7EA83B' 
      },
  cardInfo: { 
    flex: 1
   },
  cardTitle: { 
    fontSize: 13,
     fontWeight: 'bold', 
     color: '#181818' 
    },
  cardCat: { 
    fontSize: 11, 
    color: '#666' 
  },
  cardDesc: {
     fontSize: 11,
      color: '#444', 
      marginVertical: 2 
    },
  btnSmall: { 
    backgroundColor: '#C5E188',
     paddingVertical: 4,
      paddingHorizontal: 8, 
      borderRadius: 6,
       alignSelf: 'flex-start',
        marginTop: 4 
      },
  btnSmallText: { 
    fontSize: 11,
     fontWeight: 'bold',
      color: '#181818'
     },
  btnMain: { 
    backgroundColor: '#C5E188', 
    paddingVertical: 10,
     borderRadius: 8,
      alignItems: 'center', 
      marginTop: 4 
    },
  btnMainText: {
     fontSize: 13,
      fontWeight: 'bold', 
      color: '#181818' 
    },
  mensajeBox: { 
    backgroundColor: '#EFECE6',
     padding: 6,
      borderRadius: 6, 
      marginBottom: 8 
    },
  mensajeText: {
     fontSize: 11, 
     color: '#333',
      textAlign: 'center', 
      fontWeight: '500'
     },
  emptyText: { 
    textAlign: 'center',
     color: '#666', 
     marginTop: 20, 
     fontSize: 12 
    },
  totalBox: { 
    backgroundColor: '#FFF',
     padding: 12,
      borderRadius: 8,
       marginTop: 8,
       alignItems: 'flex-end', 
       borderWidth: 1, 
       borderColor: '#EEE'
       },
  totalText: {
     fontSize: 14,
      fontWeight: 'bold',
       color: '#181818' 
      },
  cardAdmin: {
     flexDirection: 'row',
     backgroundColor: '#FFF',
      padding: 8,
       borderRadius: 8, 
       marginBottom: 6,
        alignItems: 'center',
         borderWidth: 1, 
         borderColor: '#EEE'
         },
  btnDelete: { 
    backgroundColor: '#FFCDD2', 
    paddingVertical: 4, 
    paddingHorizontal: 8,
     borderRadius: 6 
    },
  btnDeleteText: { 
    color: '#C62828',
     fontWeight: 'bold', 
     fontSize: 11
     },
  toggleBtn: {
     backgroundColor: '#EFECE6',
      padding: 8, 
      borderRadius: 8,
       alignItems: 'center',
        marginBottom: 8 },
  toggleText: { 
    fontSize: 11, 
    fontWeight: '600',
     color: '#181818'
     }
});