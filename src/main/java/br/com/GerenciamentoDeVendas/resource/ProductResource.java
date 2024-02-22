package br.com.GerenciamentoDeVendas.resource;

import br.com.GerenciamentoDeVendas.entity.Product;
import br.com.GerenciamentoDeVendas.entity.Projection.FindMyProductProjection;
import br.com.GerenciamentoDeVendas.entity.Projection.GetCategoriesProjection;
import br.com.GerenciamentoDeVendas.entity.Projection.RankingProductProjection;
import br.com.GerenciamentoDeVendas.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductResource {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{id}")
    public Iterable<FindMyProductProjection> findMyProducts(@PathVariable int id){
        return productRepository.findProducts(id);
    }

    @GetMapping("/ranking")
    public Iterable<RankingProductProjection> rankingProducts(){
        return productRepository.getTopSellingProducts();
    }

    @GetMapping("/categories")
    public Iterable<GetCategoriesProjection> getCategories(){
        return productRepository.getUniqueCategoryNames();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return productRepository.save(product);
    }
}
