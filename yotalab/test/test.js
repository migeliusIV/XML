import { getAllTariffs } from "../data/tariffsAPI.js";

//console.log(getAllTariffs());

async function testGetAllTariffs() {
  try {
    console.log("Тестируем getAllTariffs()...");
    const tariffs = await getAllTariffs();
    console.log("Результат:", tariffs);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

testGetAllTariffs();