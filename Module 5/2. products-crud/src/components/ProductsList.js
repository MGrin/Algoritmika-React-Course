import React from 'react'
import ProductRow from './ProductRow'

/**
 * Дополните компонент ProductsList
 */
export default class ProductsList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],

    /**
     * Добавьте в state поля, нужные для создания нового продукта
     */

    // ВАШ КОД
  }

  componentDidMount() {
    /**
     * Запросите изначальный списов продуктов у API
     * и сохраните результат в state
     */

    // ВАШ КОД
  }

  addNewProduct = () => {
    // ВАШ КОД
  }

  deleteProduct = (product) => {
    // ВАШ КОД
  }

  render() {
    const { loading, error, data } = this.state;

    /**
     * Если данные все еще грузятся,
     * компонент должен отрисовывать сообщение об ожидании данных
     */
    if (/** ВАШ КОД */) {
      return (
        <h1 data-testid="loading-message">Подождите...</h1>
      )
    }

    /**
     * Если сервер вернул ошибку,
     * компонент должен отрисовывать сообщение об ошибке
     */
    if (/** ВАШ КОД */) {
      return (
        <p data-testid="error-message">
          {/* ВАШ КОД */}
        </p>
      )
    }

    /**
     * Если данные успешно получены,
     * компонент должен отрисовать список продуктов
     * используя компонент ProductRow и передавая ему продукт в пропс product.
     * Пример:
     *   ...
     *     <ProductRow product={product} />
     *   ...
     * Также компонент должен отрисовать форму добавления нового товара.
     * Для тестирования вашего кода, пожалуйста, передайте следующие пропсы инпутам и кнопке:
     * - data-testid="input-title" тому инпуту, в который должно быть введено название товара
     * - data-testid="input-price" тому инпуту, в который должна быть введена цена товара
     * - data-testid="button-add-product" кнопке, по нажатию на которую товар будет создан
     */
    return (
      <div>
        {/* Форма добавления нового продукта */}

        {/* Список товаров */}
      </div>
    )
    
  }
  
}