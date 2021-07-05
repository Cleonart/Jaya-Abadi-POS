const Module = () => import("./Module.vue");
const OrderPembelian = () => import("./views/order_pembelian");
const OrderPenjualan = () => import("./views/order_penjualan");
const FormOrderPembelian = () => import("./views/form_order_pembelian.vue");
const FormOrderPenjualan = () => import("./views/form_order_penjualan.vue");
const FormOrderPOS = () => import("./views/form_order_pos.vue")

const routes = {
	path : "order",
	component : Module,
	children : [
		{
			path : "pembelian",
			component : Module,
			children : [
				{
					path : "",
					component : OrderPembelian
				},
				{
					path : ":id",
					component : FormOrderPembelian
				}
			]
		},
		{
			path : "penjualan",
			component : Module,
			children : [
				{
					path : "",
					component : OrderPenjualan
				},
				{
					path : ":id",
					component : FormOrderPenjualan
				}
			]
		},
		{
			path : "pos",
			component : Module,
			children : [
				{
					path : "",
					component : FormOrderPOS
				},
				{
					path : ":id",
					component : FormOrderPOS
				}
			]
		}
	]
}

export default routes;