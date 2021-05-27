const controller = {};
const Laptops = require("../models/laptops");
const validator = require("../validators/laptopsvalidator");

controller.saveLaptop = async (req, res) => {
  let image = req.body.image;
  let brand = req.body.brand;
  let model = req.body.model;
  let price = req.body.price;
  let url = req.body.url;
  let fabric_date = req.body.fabric_date;
  let cpu = req.body.cpu;
  let cpu_core = req.body.cpu_core;
  let cpu_speed = req.body.cpu_speed;
  let ram_type = req.body.ram_type;
  let ram_speed = req.body.ram_speed;
  let ram_size = req.body.ram_size;
  let ram_expand = req.body.ram_expand;
  let graphics = req.body.graphics;
  let resolution = req.body.resolution;
  let rom = req.body.rom;
  let hdmi = req.body.hdmi;
  let usb = req.body.usb;
  let battery = req.body.battery;
  let os = req.body.os;
  let weight = req.body.weight;
  let valoration = req.body.valoration;

  const validation = validator.validate(req.body);

  if (validation.error) {
    const errors = [];
    for (let index = 0; index < validation.error.details.length; index++) {
      errors.push(validation.error.details[index].message);
    }
    console.log(validation.error);
    res.status(400).send(errors);
    return;
  }

  try {
    const laptop = new Laptops({
      image: image,
      brand: brand,
      model: model,
      price: price,
      url: url,
      fabric_date: fabric_date,
      cpu: cpu,
      cpu_core: cpu_core,
      cpu_speed: cpu_speed,
      ram_type: ram_type,
      ram_speed: ram_speed,
      ram_size: ram_size,
      ram_expand: ram_expand,
      graphics: graphics,
      resolution: resolution,
      rom: rom,
      hdmi: hdmi,
      usb: usb,
      battery: battery,
      os: os,
      weight: weight,
      valoration: valoration,
    });

    await laptop.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

// Devuelve todas las series

// controller.getLaptops = async (req, res) => {
//   try {
//     const laptops = await Laptops.find();
//     res.json(laptops);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

//Devuelve profile filtrada por nombre

// controller.getPeople = async (req, res) => {
//     const filter = req.query.filter
//   try {
//     const people = await People.find({name: new RegExp(filter, "i")});
//     res.json(people);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

//Devuelve filtrado por dos campos

// controller.getLaptops = async (req, res) => {
//     const filter = req.query.filter;

//     let price = req.query.price
//     let fabric_date = req.query.fabric_date
//     let cpu =  req.query.cpu
//     let cpu_core = req.query.cpu_core
//     let cpu_speed = req.query.cpu_speed
//     let ram_type = req.query.ram_type
//     let ram_speed = req.query.ram_speed
//     let ram_size = req.query.ram_size
//     let ram_expand = req.query.ram_expand
//     let graphics = req.query.graphics
//     let resolution = req.query.resolution
//     let rom = req.query.rom
//     let hdmi = req.query.hdmi
//     let usb = req.query.usb
//     let battery = req.query.battery
//     let os = req.query.os
//     let weight = req.query.weight

//     const isRecent = req.query.isRecent

//   try {

//     const query = {
//       $or: [
//         {
//           brand: new RegExp(filter, 'i')
//         },
//         {
//           model: new RegExp(filter, 'i')
//         }
//       ]
//     }

//     if (price || os){
//       query.$and =[]
//     }

//     if(price){
//       query.$and.push(
//         {
//           price: {
//             $lte: price}
//         }
//       )
//     }

//     if(os){
//       query.$and.push(
//         {
//           os:  new RegExp(os, 'i')
//         }
//       )
//     }

//     if(isRecent === "true"){
//       const laptops = await Laptops.find(query).sort({"updatedAt":"desc"}).limit(2);
//     res.json(laptops);
//     } else {
//       const laptops = await Laptops.find(query);
//     res.json(laptops);
//     }

//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

controller.getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptops.find();
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getLaptopsPagination = async (req, res) => {
  const filter = req.query.filter;

  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let cpuAMD = req.query.cpuAMD;
  let cpuINTEL = req.query.cpuINTEL;
  let cpuMONE = req.query.cpuMONE;
  let graphicsAMD = req.query.graphicsAMD;
  let graphicsNVIDIA = req.query.graphicsNVIDIA;
  let graphicsINTEGRATED = req.query.graphicsINTEGRATED;
  let romHDD = req.query.romHDD;
  let romSSD = req.query.romSSD;
  let ram_typeTHREE = req.query.ram_typeTHREE;
  let ram_typeFOUR = req.query.ram_typeFOUR;

  // let fabric_date = req.query.fabric_date
  // let cpu_core = req.query.cpu_core
  // let cpu_speed = req.query.cpu_speed
  // let ram_speed = req.query.ram_speed
  // let ram_size = req.query.ram_size
  // let ram_expand = req.query.ram_expand
  // let resolution = req.query.resolution
  // let hdmi = req.query.hdmi
  // let usb = req.query.usb
  // let battery = req.query.battery
  // let os = req.query.os
  // let weight = req.query.weight

  try {
    // const query = {
    //   $or: [
    //     {
    //       brand: new RegExp(filter, 'i')
    //     },
    //     {
    //       model: new RegExp(filter, 'i')
    //     }
    //   ]
    // }

    // if (minPrice || maxPrice || graphicsAMD || graphicsNVIDIA || cpu || rom || ram_type){
    //   query.$and = []
    // }

    // if(minPrice){
    //   query.$and.push(
    //     {
    //       price: {
    //         $gte: minPrice,

    //       }

    //     }
    //   )
    // }

    // if(maxPrice){
    //   query.$and.push(
    //     {
    //       price: {
    //         $lte: maxPrice
    //       }

    //     }
    //   )
    // }

    // if(graphicsAMD){
    //   query.$and.push(
    //     {
    //       graphics:  new RegExp(graphicsAMD, 'i')
    //     }
    //   )
    // }

    // if(graphicsNVIDIA){
    //   query.$and.push(
    //     {
    //       graphics:  new RegExp(graphicsNVIDIA, 'i')
    //     }
    //   )
    // }

    // if(cpu){
    //   query.$and.push(
    //     {
    //       cpu:  new RegExp(cpu, 'i')
    //     }
    //   )
    // }

    // if(rom){
    //   query.$and.push(
    //     {
    //       rom:  new RegExp(rom, 'i')
    //     }
    //   )
    // }

    // if(ram_type){
    //   query.$and.push(
    //     {
    //       ram_type:  new RegExp(ram_type, 'i')
    //     }
    //   )
    // }
    let query = {};
    query = {
      $and: [
        {
          $or: [
            {
              brand: new RegExp(filter, "i"),
            },
            {
              model: new RegExp(filter, "i"),
            },
          ],
        },
      ],
    };

    let cpu_n = 1;
    let graphics_n = 1;
    let ram_n = 1;
    let rom_n = 1;

    if (cpuAMD || cpuINTEL || cpuMONE) {
      query.$and.push({
        $or: [],
      });

      graphics_n = 2;
      ram_n = 2;
      rom_n = 2;
    }

    if (cpuAMD) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuAMD, "i"),
      });
    }

    if (cpuINTEL) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuINTEL, "i"),
      });
    }

    if (cpuMONE) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuMONE, "i"),
      });
    }

    if (graphicsAMD || graphicsNVIDIA || graphicsINTEGRATED) {
      query.$and.push({
        $or: [],
      });

      if (ram_n == 2) {
        ram_n = 3;
      } else if (ram_n == 1) {
        ram_n = 2;
      }

      if (rom_n == 2) {
        rom_n = 3;
      } else if (rom_n == 1) {
        rom_n = 2;
      }
    }

    if (graphicsAMD) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsAMD, "i"),
      });
    }

    if (graphicsNVIDIA) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsNVIDIA, "i"),
      });
    }

    if (graphicsINTEGRATED) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsINTEGRATED, "i"),
      });
    }

    if (ram_typeTHREE || ram_typeFOUR) {
      query.$and.push({
        $or: [],
      });

      if (rom_n == 3) {
        rom_n = 4;
      } else if (rom_n == 2) {
        rom_n = 3;
      } else if (rom_n == 1) {
        rom_n = 2;
      }
    }

    if (ram_typeTHREE) {
      query.$and[ram_n].$or.push({
        ram_type: new RegExp(ram_typeTHREE, "i"),
      });
    }

    if (ram_typeFOUR) {
      query.$and[ram_n].$or.push({
        ram_type: new RegExp(ram_typeFOUR, "i"),
      });
    }

    if (romHDD || romSSD) {
      query.$and.push({
        $or: [],
      });
    }

    if (romHDD) {
      query.$and[rom_n].$or.push({
        rom: new RegExp(romHDD, "i"),
      });
    }

    if (romSSD) {
      query.$and[rom_n].$or.push({
        rom: new RegExp(romSSD, "i"),
      });
    }

    if (minPrice) {
      query.$and.push({
        price: {
          $gte: minPrice,
        },
      });
    }

    if (maxPrice) {
      query.$and.push({
        price: {
          $lte: maxPrice,
        },
      });
    }

    // console.log(cpu_n);
    // console.log(graphics_n);
    // console.log(ram_n);
    // console.log(rom_n);

    // console.log(query);
    const page = req.params.page;
    const show = 12;
  
    const laptops = await Laptops.find(query).sort({ brand: "asc", price: "asc" }).limit(show)
    .skip(show * (page - 1));
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getLaptops = async (req, res) => {
  const filter = req.query.filter;

  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let cpuAMD = req.query.cpuAMD;
  let cpuINTEL = req.query.cpuINTEL;
  let cpuMONE = req.query.cpuMONE;
  let graphicsAMD = req.query.graphicsAMD;
  let graphicsNVIDIA = req.query.graphicsNVIDIA;
  let graphicsINTEGRATED = req.query.graphicsINTEGRATED;
  let romHDD = req.query.romHDD;
  let romSSD = req.query.romSSD;
  let ram_typeTHREE = req.query.ram_typeTHREE;
  let ram_typeFOUR = req.query.ram_typeFOUR;

  // let fabric_date = req.query.fabric_date
  // let cpu_core = req.query.cpu_core
  // let cpu_speed = req.query.cpu_speed
  // let ram_speed = req.query.ram_speed
  // let ram_size = req.query.ram_size
  // let ram_expand = req.query.ram_expand
  // let resolution = req.query.resolution
  // let hdmi = req.query.hdmi
  // let usb = req.query.usb
  // let battery = req.query.battery
  // let os = req.query.os
  // let weight = req.query.weight

  try {
    // const query = {
    //   $or: [
    //     {
    //       brand: new RegExp(filter, 'i')
    //     },
    //     {
    //       model: new RegExp(filter, 'i')
    //     }
    //   ]
    // }

    // if (minPrice || maxPrice || graphicsAMD || graphicsNVIDIA || cpu || rom || ram_type){
    //   query.$and = []
    // }

    // if(minPrice){
    //   query.$and.push(
    //     {
    //       price: {
    //         $gte: minPrice,

    //       }

    //     }
    //   )
    // }

    // if(maxPrice){
    //   query.$and.push(
    //     {
    //       price: {
    //         $lte: maxPrice
    //       }

    //     }
    //   )
    // }

    // if(graphicsAMD){
    //   query.$and.push(
    //     {
    //       graphics:  new RegExp(graphicsAMD, 'i')
    //     }
    //   )
    // }

    // if(graphicsNVIDIA){
    //   query.$and.push(
    //     {
    //       graphics:  new RegExp(graphicsNVIDIA, 'i')
    //     }
    //   )
    // }

    // if(cpu){
    //   query.$and.push(
    //     {
    //       cpu:  new RegExp(cpu, 'i')
    //     }
    //   )
    // }

    // if(rom){
    //   query.$and.push(
    //     {
    //       rom:  new RegExp(rom, 'i')
    //     }
    //   )
    // }

    // if(ram_type){
    //   query.$and.push(
    //     {
    //       ram_type:  new RegExp(ram_type, 'i')
    //     }
    //   )
    // }
    let query = {};
    query = {
      $and: [
        {
          $or: [
            {
              brand: new RegExp(filter, "i"),
            },
            {
              model: new RegExp(filter, "i"),
            },
          ],
        },
      ],
    };

    let cpu_n = 1;
    let graphics_n = 1;
    let ram_n = 1;
    let rom_n = 1;

    if (cpuAMD || cpuINTEL || cpuMONE) {
      query.$and.push({
        $or: [],
      });

      graphics_n = 2;
      ram_n = 2;
      rom_n = 2;
    }

    if (cpuAMD) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuAMD, "i"),
      });
    }

    if (cpuINTEL) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuINTEL, "i"),
      });
    }

    if (cpuMONE) {
      query.$and[cpu_n].$or.push({
        cpu: new RegExp(cpuMONE, "i"),
      });
    }

    if (graphicsAMD || graphicsNVIDIA || graphicsINTEGRATED) {
      query.$and.push({
        $or: [],
      });

      if (ram_n == 2) {
        ram_n = 3;
      } else if (ram_n == 1) {
        ram_n = 2;
      }

      if (rom_n == 2) {
        rom_n = 3;
      } else if (rom_n == 1) {
        rom_n = 2;
      }
    }

    if (graphicsAMD) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsAMD, "i"),
      });
    }

    if (graphicsNVIDIA) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsNVIDIA, "i"),
      });
    }

    if (graphicsINTEGRATED) {
      query.$and[graphics_n].$or.push({
        graphics: new RegExp(graphicsINTEGRATED, "i"),
      });
    }

    if (ram_typeTHREE || ram_typeFOUR) {
      query.$and.push({
        $or: [],
      });

      if (rom_n == 3) {
        rom_n = 4;
      } else if (rom_n == 2) {
        rom_n = 3;
      } else if (rom_n == 1) {
        rom_n = 2;
      }
    }

    if (ram_typeTHREE) {
      query.$and[ram_n].$or.push({
        ram_type: new RegExp(ram_typeTHREE, "i"),
      });
    }

    if (ram_typeFOUR) {
      query.$and[ram_n].$or.push({
        ram_type: new RegExp(ram_typeFOUR, "i"),
      });
    }

    if (romHDD || romSSD) {
      query.$and.push({
        $or: [],
      });
    }

    if (romHDD) {
      query.$and[rom_n].$or.push({
        rom: new RegExp(romHDD, "i"),
      });
    }

    if (romSSD) {
      query.$and[rom_n].$or.push({
        rom: new RegExp(romSSD, "i"),
      });
    }

    if (minPrice) {
      query.$and.push({
        price: {
          $gte: minPrice,
        },
      });
    }

    if (maxPrice) {
      query.$and.push({
        price: {
          $lte: maxPrice,
        },
      });
    }

    // console.log(cpu_n);
    // console.log(graphics_n);
    // console.log(ram_n);
    // console.log(rom_n);

    // console.log(query);
    
  
    const laptops = await Laptops.find(query)
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getSomeLaptops = async (req, res) => {
  const page = req.params.page;
  const show = 8;

  try {
    const laptops = await Laptops.find()
      .sort({ brand: "asc", price: "asc" })
      .limit(show)
      .skip(show * (page - 1));
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getBestLaptops = async (req, res) => {
  const show = 6;

  try {
    const laptops = await Laptops.find()
      .sort({ valoration: "desc" })
      .limit(show);
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getPaginationLaptops = async (req, res) => {
  const page = req.params.page;
  const show = 12;

  try {
    const laptops = await Laptops.find()
      .limit(show)
      .skip(show * (page - 1));
    res.json(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.getLaptop = async (req, res) => {
  const id = req.params.ident;
  if (id) {
    try {
      const laptop = await Laptops.findById(id);
      res.json(laptop);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.updateLaptop = async (req, res) => {
  let image = req.body.image;
  let brand = req.body.brand;
  let model = req.body.model;
  let price = req.body.price;
  let url = req.body.url;
  let fabric_date = req.body.fabric_date;
  let cpu = req.body.cpu;
  let cpu_core = req.body.cpu_core;
  let cpu_speed = req.body.cpu_speed;
  let ram_type = req.body.ram_type;
  let ram_speed = req.body.ram_speed;
  let ram_size = req.body.ram_size;
  let ram_expand = req.body.ram_expand;
  let graphics = req.body.graphics;
  let resolution = req.body.resolution;
  let rom = req.body.rom;
  let hdmi = req.body.hdmi;
  let usb = req.body.usb;
  let battery = req.body.battery;
  let os = req.body.os;
  let weight = req.body.weight;

  const id = req.params.id;

  const validation = validator.validate(req.body);

  if (validation.error) {
    const errors = [];
    for (let index = 0; index < validation.error.details.length; index++) {
      errors.push(validation.error.details[index].message);
    }
    console.log(validation.error);
    res.status(400).send(errors);
    return;
  }

  try {
    await Laptops.findByIdAndUpdate(id, {
      image: image,
      brand: brand,
      model: model,
      price: price,
      url: url,
      fabric_date: fabric_date,
      cpu: cpu,
      cpu_core: cpu_core,
      cpu_speed: cpu_speed,
      ram_type: ram_type,
      ram_speed: ram_speed,
      ram_size: ram_size,
      ram_expand: ram_expand,
      graphics: graphics,
      resolution: resolution,
      rom: rom,
      hdmi: hdmi,
      usb: usb,
      battery: battery,
      os: os,
      weight: weight,
      updatedAt: Date.now(),
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

controller.deleteLaptop = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      await Laptops.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

module.exports = controller;
