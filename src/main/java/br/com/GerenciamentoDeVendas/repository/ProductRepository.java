package br.com.GerenciamentoDeVendas.repository;

import br.com.GerenciamentoDeVendas.entity.Product;
import br.com.GerenciamentoDeVendas.entity.Projection.FindMyProductProjection;
import br.com.GerenciamentoDeVendas.entity.Projection.GetCategoriesProjection;
import br.com.GerenciamentoDeVendas.entity.Projection.RankingProductProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p.productName AS productName, p.category AS category, p.stockQuantity AS stockQuantity FROM Product p WHERE p.ownerUserId = :ownerUserId")
    Iterable<FindMyProductProjection> findProducts(int ownerUserId);

    @Query("SELECT p.productName AS productName, u.username AS username, (p.initialStockQuantity - p.stockQuantity) AS unitsSold FROM Product p JOIN User u ON p.ownerUserId = u.id ORDER BY unitsSold DESC")
    Iterable<RankingProductProjection> getTopSellingProducts();

    @Query("SELECT DISTINCT p.category AS category FROM Product p")
    Iterable<GetCategoriesProjection> getUniqueCategoryNames();
}
