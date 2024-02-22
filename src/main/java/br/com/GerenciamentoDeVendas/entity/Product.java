package br.com.GerenciamentoDeVendas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int id;

    @Column(name = "product_name")
    private String productName;

    private String description;

    private float price;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "initial_stock_quantity")
    private int initialStockQuantity;

    private String category;

    @Column(name = "owner_user_id")
    private int ownerUserId;
}
