const Module = () => import("./Module.vue");
const Barang = () => import("./views/master_barang.vue");
const Pelanggan = () => import("./views/master_pelanggan.vue");
const Supplier = () => import("./views/master_supplier.vue");
const Pengguna = () => import("./views/master_pengguna.vue");

const FormBarang = () => import("./views/form_barang.vue");
const FormPelanggan = () => import("./views/form_pelanggan.vue");
const FormSupplier = () => import("./views/form_supplier.vue");
const FormPengguna = () => import("./views/form_pengguna.vue");
const FormPerusahaan = () => import("./views/form_perusahaan.vue");

const moduleRoute = {
	path : "master",
	component : Module,
	children : [
		{
			path : "barang",
			component : Module,
			children : [
				{
					path : "",
					component : Barang,
				},
				{
					path : ":id",
					component : FormBarang
				}
			]
		},
		{
			path : "pelanggan",
			component : Module,
			children : [
				{
					path : "",
					component : Pelanggan
				},
				{
					path : ":id",
					component : FormPelanggan
				}
			]
		},
		{
			path : "supplier",
			component : Module,
			children : [
				{
					path : "",
					component : Supplier
				},
				{
					path : ":id",
					component : FormSupplier
				}
			]
		},
		{
			path : "pengguna",
			component : Module,
			children : [
				{
					path : "",
					component : Pengguna
				},
				{
					path : ":id",
					component : FormPengguna
				}
			]
		},
		{
			path : "perusahaan",
			component : Module,
			children : [
				{
					path : ":id",
					component : FormPerusahaan
				}
			]
		},
	]
}

export default moduleRoute;