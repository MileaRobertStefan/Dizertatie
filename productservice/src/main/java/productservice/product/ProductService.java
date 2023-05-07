package productservice.product;

import productservice.productphoto.ProductPhoto;
import productservice.productphoto.ProductPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    public Product createProduct(Product product, List<String> photoUrls) throws IOException {
        Product savedProduct = productRepository.save(product);

        List<ProductPhoto> savedPhotos = new ArrayList<>();
        for (String url : photoUrls) {
            ProductPhoto productPhoto = new ProductPhoto();
            productPhoto.setProduct(savedProduct);
            productPhoto.setUrl(url);
            savedPhotos.add(productPhotoRepository.save(productPhoto));
        }

        savedProduct.setPhotos(savedPhotos.stream().map(ProductPhoto::getUrl).collect(Collectors.toList()));

        return savedProduct;
    }

    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);
        existingProduct.setOwnerID(updatedProduct.getOwnerID());
        existingProduct.setTitle(updatedProduct.getTitle());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCurrency(updatedProduct.getCurrency());
        existingProduct.setPhotos(updatedProduct.getPhotos());
        existingProduct.setDiscussionID(updatedProduct.getDiscussionID());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setBrand(updatedProduct.getBrand());
        existingProduct.setCondition(updatedProduct.getCondition());
        return productRepository.save(existingProduct);
    }

    public boolean deleteProduct(Long id) {
        productRepository.deleteById(id);
        return true;
    }
}