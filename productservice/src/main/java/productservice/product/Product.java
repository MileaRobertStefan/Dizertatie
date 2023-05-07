package productservice.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long ownerID;
    private String title;
    @Column(length = 2500)
    private String description;
    private Double price;
    private String currency;
    @ElementCollection
    private List<String> photos;
    private String discussionID;
    private String category;
    private String brand;
    @Column(name = "itemCondition")
    private String condition;
}

